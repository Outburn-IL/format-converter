export interface ICache<T> {
  get: (key: string) => T
  set: (key: string, value: T) => void
  getDict: () => Record<string, T>
}

class SimpleCache<T> implements ICache<T> {
  private cache: Record<string, any> = {};

  get = (key: string) => this.cache[key];
  set = (key: string, value: any) => this.cache[key] = value;
  getDict = () => this.cache;
}

const v2keyMap: ICache<string> = new SimpleCache<string>();

const cache = { v2keyMap };

export const getCache = () => cache;