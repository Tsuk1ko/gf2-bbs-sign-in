# gf2-bbs-sign-in

少前2社区每日签到、每日任务、自动兑换

## Secrets / Variables / ENV

- `BBS_USERNAME` (必须)  
  用户名
- `BBS_PASSWORD` (必须)  
  密码
- `AUTO_EXCHANGE` (可选)  
  自动兑换道具，按优先级顺序排列，以逗号 `,` 分隔，默认为 `day,month,life,*`
  - 可以是兑换周期，如 `day,month,life` 分别表示“每日限购”、“每月限购”、“终身限购”
  - 可以是物品名称，只要名称包含就算，如 `情报拼图,萨狄斯金,战场报告,解析图纸,基原信息核,火控校准芯片,共键,次世代内存条`
  - `*` 表示任意物品，可以放在最后以防出现其他未考虑到的物品
- `FAILED_WEBHOOK` (可选)  
  失败时会以 GET 方式请求
