import { createApi } from './api';
import { API_BASE, COMMON_HEADER } from './const';
import encrypt from './encrypt';
import type { GF2API, GF2APIResp, ExchangeItem } from './types';

export class GF2BBSClient {
  private password: string;
  private token?: string;
  private score = 0;

  private api = createApi<GF2API>(API_BASE, async (method, urlStr, data) => {
    const url = new URL(urlStr);
    if (method === 'get' && data) {
      Object.entries(data).forEach(([k, v]) => url.searchParams.set(k, v));
    }
    const isPost = method === 'post';
    const res: GF2APIResp = await fetch(url, {
      headers: {
        ...(this.token ? { Authorization: this.token } : {}),
        ...(isPost ? { 'Content-Type': 'application/json' } : {}),
        ...COMMON_HEADER,
      },
      ...(isPost ? { method: 'POST', body: JSON.stringify(data || {}) } : {}),
    }).then(r => r.json());
    if (res.Code !== 0) throw new Error(res.Message);
    return res.data;
  });

  constructor(private username: string, password: string) {
    this.password = encrypt(password);
  }

  async login() {
    const data = await this.api.login.account.post({
      account_name: this.username,
      passwd: this.password,
      source: 'phone',
    });

    this.token = data.account.token;
  }

  async getSignInStatus() {
    const data = await this.api.community.task.get_current_sign_in_status.get();

    return data.has_sign_in;
  }

  async signIn() {
    const data = await this.api.community.task.sign_in.post();

    return {
      item: data.get_item_name,
      count: data.get_item_count,
      exp: data.get_exp,
      score: data.get_score,
    };
  }

  async getDailyTaskList() {
    const data = await this.api.community.task.get_current_task_list.get();

    return data.daily_task.map(item => ({
      name: item.task_name,
      count: item.complete_count,
      maxCount: item.max_complete_count,
    }));
  }

  async getTopicList() {
    const { list } = await this.api.community.topic.list.get();

    return list;
  }

  async visitTopic(id: number) {
    await this.api.community.topic[id].get({ id });
  }

  async likeTopic(id: number) {
    await this.api.community.topic.like[id].get({ id });
  }

  async shareTopic(id: number) {
    await this.api.community.topic.share[id].get({ id });
  }

  async getExchangeList() {
    const { list } = await this.api.community.item.exchange_list.get();

    return list;
  }

  async getUserInfo() {
    const { user } = await this.api.community.member.info.post();

    this.score = user.score;

    return user;
  }

  async exchangeItem(id: number) {
    await this.api.community.item.exchange.post({ exchange_id: id });
  }

  async exchangeIfCan(item: ExchangeItem) {
    let exchangeCount = 0;
    while (
      this.score >= item.use_score &&
      exchangeCount + item.exchange_count < item.max_exchange_count &&
      exchangeCount < 10 // 意外保护
    ) {
      await this.exchangeItem(item.exchange_id);
      exchangeCount++;
      this.score -= item.use_score;
    }
    return exchangeCount;
  }
}
