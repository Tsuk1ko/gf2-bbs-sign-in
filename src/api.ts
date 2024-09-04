type ApiClient<T extends Array<any>> = Record<
  'get' | 'post',
  T['1'] extends Record<string, any> ? (data: T['1']) => Promise<T['0']> : (data?: any) => Promise<T['0']>
>;

type ApiTree<T> = T extends Array<any>
  ? ApiClient<T>
  : T extends Record<string, any>
  ? {
      [P in Extract<keyof T, string | number>]: ApiTree<T[P]>;
    }
  : never;

export const createApi = <T>(
  base: string,
  handleFetch: (method: 'get' | 'post', url: string, data?: Record<string, any>) => Promise<any>,
) =>
  new Proxy(
    {},
    {
      get: (target, p, receiver) =>
        p === 'get' || p === 'post'
          ? (data?: any) => handleFetch(p, base, data)
          : p === 'toString' || p === 'valueOf' || typeof p === 'symbol'
          ? Reflect.get(target, p, receiver)
          : createApi(`${base}/${p}`, handleFetch),
    },
  ) as any as ApiTree<T>;
