import { GF2BBSClient } from './client';

const { BBS_USERNAME, BBS_PASSWORD, AUTO_EXCHANGE, FAILED_WEBHOOK } = process.env;

if (!BBS_USERNAME || !BBS_PASSWORD) {
  console.error('No BBS_USERNAME or BBS_PASSWORD');
  process.exit(1);
}

const autoExchange = (AUTO_EXCHANGE || '基原信息核,次世代内存条,萨狄斯金,情报拼图,战场报告,解析图纸').split(',');

console.log('自动兑换:', autoExchange);

let hasError = false;

try {
  const client = new GF2BBSClient(BBS_USERNAME, BBS_PASSWORD);

  await client.login();
  console.log('登录成功');

  if (await client.getSignInStatus()) {
    console.log('今日已签到');
  } else {
    try {
      const { item, count, exp, score } = await client.signIn();
      console.log(`签到成功，获得【${item}*${count}】，经验+${exp}，积分+${score}`);
    } catch (error) {
      console.error('签到失败', error);
    }
  }

  const dailyTaskList = await client.getDailyTaskList();
  console.log('每日任务：');
  dailyTaskList.forEach(({ name, count, maxCount }) => {
    console.log(name, `(${count}/${maxCount})`);
  });

  if (dailyTaskList.some(({ count, maxCount }) => count < maxCount)) {
    const topicList = await client.getTopicList().catch(e => {
      console.error('获取帖子列表失败', e);
    });

    if (topicList?.length) {
      const dailyTaskMethodMap = {
        浏览帖子: 'visitTopic',
        点赞帖子: 'likeTopic',
        分享帖子: 'shareTopic',
      } as const;

      for (const { name, count, maxCount } of dailyTaskList) {
        let remain = maxCount - count;
        if (remain <= 0) continue;

        for (const { topic_id: id } of name === '点赞帖子' ? topicList.filter(t => !t.is_like) : topicList) {
          try {
            await client[dailyTaskMethodMap[name as keyof typeof dailyTaskMethodMap]](id);
            console.log(name, id, '成功');
            if (--remain <= 0) break;
          } catch (error) {
            console.error(name, id, '失败', error);
          }
        }
      }
    }
  }

  console.log('当前积分:', (await client.getUserInfo()).score);

  const itemMap = Object.fromEntries(
    (await client.getExchangeList())
      .filter(({ exchange_count, max_exchange_count }) => exchange_count < max_exchange_count)
      .map(item => [item.item_name, item]),
  );

  for (const name of autoExchange) {
    const item = itemMap[name];
    if (!item) continue;
    const count = await client.exchangeIfCan(item);
    if (count === 0) break;
    console.log(`成功兑换【${name}*${count}】`);
  }
} catch (error) {
  hasError = true;
  console.error(error);
}

if (hasError) {
  if (FAILED_WEBHOOK) await fetch(FAILED_WEBHOOK).catch(console.error);
  process.exit(1);
}
