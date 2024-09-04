export const API_BASE = 'https://gf2-bbs-api.sunborngame.com';

const BBS_ORIGIN = 'https://gf2-bbs.sunborngame.com';

export const COMMON_HEADER = {
  Accept: 'application/json',
  'Accept-Language': 'zh-CN,zh;q=0.9',
  Origin: BBS_ORIGIN,
  Referer: `${BBS_ORIGIN}/`,
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
};
