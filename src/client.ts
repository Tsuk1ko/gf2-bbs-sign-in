import {
  API_EXCHANGE_ITEM,
  API_EXCHANGE_LIST,
  API_GET_SIGN_IN_STATUS,
  API_SIGN_IN,
  API_USER_INFO,
  COMMON_HEADER,
} from './const';

interface GF2BBSAPIResp<T = {}> {
  Code: number;
  Message: string;
  data: T;
}

interface ExchangeItem {
  exchange_id: number;
  item_name: string;
  item_count: number;
  item_pic: string;
  item_context: string;
  use_score: number;
  exchange_count: number;
  max_exchange_count: number;
  cycle: 'day' | 'month';
}

export class GF2BBSClient {
  private score = 0;

  constructor(private auth: string) {}

  async getSignInStatus() {
    const data = await this.callApi<{ has_sign_in: boolean }>(
      API_GET_SIGN_IN_STATUS
    );

    return data.has_sign_in;
  }

  async signIn() {
    const data = await this.callApi<{
      get_exp: number;
      get_item_count: number;
      get_item_name: string;
      get_item_url: string;
      get_score: number;
    }>(API_SIGN_IN, {});

    return {
      item: data.get_item_name,
      count: data.get_item_count,
      exp: data.get_exp,
      score: data.get_score,
    };
  }

  async getExchangeList() {
    const { list } = await this.callApi<{
      list: ExchangeItem[];
      total: number;
    }>(API_EXCHANGE_LIST);

    return list;
  }

  async getUserInfo() {
    const { user } = await this.callApi<{
      user: {
        auth_lock: number;
        auth_type: number;
        avatar: string;
        exp: number;
        fans: number;
        favors: number;
        follows: number;
        game_commander_level: number;
        game_nick_name: string;
        game_uid: number;
        ip_location: string;
        is_admin: false;
        is_author: false;
        is_follow: false;
        level: number;
        likes: number;
        next_lv_exp: number;
        nick_name: string;
        score: number;
        signature: string;
        uid: number;
      };
    }>(API_USER_INFO, {});

    this.score = user.score;

    return user;
  }

  async exchangeItem(id: number) {
    await this.callApi(API_EXCHANGE_ITEM, { exchange_id: id });
  }

  async exchangeIfCan(item: ExchangeItem) {
    let exchangeCount = 0;
    while (
      this.score > item.use_score &&
      exchangeCount + item.exchange_count < item.max_exchange_count &&
      exchangeCount < 10 // 意外保护
    ) {
      await this.exchangeItem(item.exchange_id);
      exchangeCount++;
      this.score -= item.use_score;
    }
    return exchangeCount;
  }

  private async callApi<T = {}>(url: string, body?: Record<string, any>) {
    const res: GF2BBSAPIResp<T> = await fetch(url, {
      headers: {
        Authorization: this.auth,
        ...COMMON_HEADER,
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(body ? { method: 'POST', body: JSON.stringify(body) } : {}),
    }).then((r) => r.json());

    if (res.Code !== 0) throw new Error(res.Message);

    return res.data;
  }
}
