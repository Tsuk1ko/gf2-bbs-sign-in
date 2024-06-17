import { API_GET_SIGN_IN_STATUS, API_SIGN_IN, COMMON_HEADER } from './const';

interface GF2BBSAPIResp<T = null> {
  Code: number;
  Message: string;
  data: T;
}

export class GF2BBSClient {
  private header: Record<string, string>;

  constructor(auth: string) {
    this.header = {
      ...COMMON_HEADER,
      Authorization: auth,
    };
  }

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
    }>(API_SIGN_IN, { method: 'POST', body: '{}' });

    return {
      item: data.get_item_name,
      count: data.get_item_count,
    };
  }

  private async callApi<T = null>(url: string, init?: RequestInit) {
    const res: GF2BBSAPIResp<T> = await fetch(url, {
      headers: this.header,
      ...init,
    }).then((r) => r.json());

    if (res.Code !== 0) throw new Error(res.Message);

    return res.data;
  }
}
