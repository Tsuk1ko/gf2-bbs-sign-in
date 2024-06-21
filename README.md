# gf2-bbs-sign-in

少前2社区每日签到

## Secrets / ENV

- `BBS_AUTH` (必须)  
  前往[官方社区](https://gf2-bbs.sunborngame.com/)，登录后 <kbd>F12</kbd> Network 随便找个 API 请求 Request Headers 里拿到 Authorization，可多账号，以逗号 `,` 分隔
- `AUTO_EXCHANGE` (可选)  
  自动兑换道具，按优先级顺序排列，以逗号 `,` 分隔，默认为 `基原信息核,萨狄斯金,情报拼图`
- `FAILED_WEBHOOK` (可选)  
  失败时会以 GET 方式请求
