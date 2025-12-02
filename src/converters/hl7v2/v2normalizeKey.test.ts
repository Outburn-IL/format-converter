import { describe, it, expect, beforeEach } from 'vitest';
import { v2normalizeKey } from './v2normalizeKey';
import { getCache, ICache } from './cache';

describe('v2normalizeKey', () => {
  let v2keyMap: ICache<any>;

  beforeEach(() => {
    v2keyMap = getCache().v2keyMap;
  });

  it('normalizes key', async () => {
    const res = await v2normalizeKey('hello');
    expect(res).toBe('Hello');
  });

  it('stores normalized key', async () => {
    await v2normalizeKey('hello');
    expect(v2keyMap.get('hello')).toBe('Hello');
  });

  it('returns from cache, if exists in cache.v2keyMap', async () => {
    v2keyMap.set('hello', 'Hello2');
    const res = await v2normalizeKey('hello');
    expect(res).toBe('Hello2');
  });
});
