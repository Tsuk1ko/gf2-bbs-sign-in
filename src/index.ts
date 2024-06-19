import { GF2BBSClient } from './client';

const { BBS_AUTH, AUTO_EXCHANGE } = process.env;

if (!BBS_AUTH) {
  console.error('No BBS_AUTH');
  process.exit(1);
}

const autoExchange = (AUTO_EXCHANGE || '基原信息核,萨狄斯金,情报拼图').split(',');

console.log('自动兑换:', autoExchange);

let hasError = false;

for (const [i, auth] of BBS_AUTH.split(',').entries()) {
  if (!auth) continue;

  console.log(`[${i}]`);

  try {
    const client = new GF2BBSClient(auth);

    const isSigned = await client.getSignInStatus();

    if (isSigned) {
      console.log('今日已签到');
    } else {
      const { item, count, exp, score } = await client.signIn();
      console.log(`签到成功，获得【${item}*${count}】，经验+${exp}，积分+${score}`);
    }

    const info = await client.getUserInfo();
    console.log('当前积分:', info.score);

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
}

if (hasError) process.exit(1);
