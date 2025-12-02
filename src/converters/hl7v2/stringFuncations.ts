import { expressions } from './jsonataExpressions';

export const startsWith = (str: string | undefined, startStr: string): boolean | undefined => {
  if (typeof str === 'undefined') return undefined;
  return str.startsWith(startStr);
};

export const initCapOnce = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1);
};

export const initCap = (str: string): Promise<string> => {
  return expressions.initCap.evaluate(str, { initCapOnce });
};