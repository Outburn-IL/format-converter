import { describe, it, expect, beforeEach } from 'vitest';
import { getCache, ICache } from './cache';
import { registerV2key } from './registerV2key';

describe('registerV2key', () => {
  let v2keyMap: ICache<any>;

  beforeEach(() => {
    v2keyMap = getCache().v2keyMap;
  });

  it('stores V2 key', async () => {
    registerV2key('key1', 'normalized1');
    expect(v2keyMap.get('key1')).toBe('normalized1');
  });

  it('overrides V2 key', async () => {
    registerV2key('key1', 'normalized1');
    registerV2key('key1', 'normalized2');
    expect(v2keyMap.get('key1')).toBe('normalized2');
  });

  it('sets multiple V2 keys', async () => {
    registerV2key('key1', 'normalized1');
    registerV2key('key2', 'normalized2');
    expect(v2keyMap.get('key1')).toBe('normalized1');
    expect(v2keyMap.get('key2')).toBe('normalized2');
  });
});
