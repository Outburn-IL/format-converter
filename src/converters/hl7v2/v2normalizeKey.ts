import { getCache } from './cache';
import { expressions } from './jsonataExpressions';
import { registerV2key } from './registerV2key';
import { initCap } from './stringFuncations';

export const v2normalizeKey = async (key: string) => {
  const bindings = {
    initCap,
    registerV2key,
    keyMap: getCache().v2keyMap.getDict()
  };
  const res = await expressions.v2normalizeKey.evaluate(key, bindings);
  return res;
};
