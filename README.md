# gf2-bbs-sign-in

少前2社区每日签到、每日任务、自动兑换

## Secrets / Variables / ENV

- `BBS_USERNAME` (必须)  
  用户名
- `BBS_PASSWORD` (必须)  
  密码
- `AUTO_EXCHANGE` (可选)  
  自动兑换道具，按优先级顺序排列，以逗号 `,` 分隔，默认为 `基原信息核,次世代内存条,萨狄斯金,情报拼图,战场报告,解析图纸`
- `FAILED_WEBHOOK` (可选)  
  失败时会以 GET 方式请求
