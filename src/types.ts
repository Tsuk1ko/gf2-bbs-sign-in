export interface ExchangeItem {
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

export interface GF2APIResp<T = any> {
  Code: number;
  Message: string;
  data: T;
}

export interface GF2API {
  login: {
    account: [
      {
        account: {
          token: string;
          uid: number;
          platform_id: number;
          channel_id: number;
        };
      },
    ];
  };
  community: {
    task: {
      get_current_sign_in_status: [{ has_sign_in: boolean }];
      sign_in: [
        {
          get_exp: number;
          get_item_count: number;
          get_item_name: string;
          get_item_url: string;
          get_score: number;
        },
      ];
      get_current_task_list: [
        Record<
          'daily_task' | 'more_task',
          Array<{
            task_name: string;
            task_context: string;
            complete_count: number;
            max_complete_count: number;
          }>
        >,
      ];
    };
    member: {
      info: [
        {
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
        },
      ];
    };
    item: {
      exchange_list: [
        {
          list: ExchangeItem[];
          total: number;
        },
      ];
      exchange: [unknown];
    };
    topic: {
      [id: number]: [unknown];
      list: [
        {
          list: Array<{
            topic_id: number;
            is_like: boolean;
          }>;
        },
      ];
      like: {
        [id: number]: [null];
      };
      share: {
        [id: number]: [null];
      };
    };
  };
}
