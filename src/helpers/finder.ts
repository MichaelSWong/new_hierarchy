/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable consistent-return  */
/* eslint-disable no-restricted-syntax  */
export const finder = (collection: any, key: string, value: any): any => {
  for (const o of collection) {
    for (const [k, v] of Object.entries(o)) {
      if (k === key && v === value) {
        return o;
      }
      if (Array.isArray(v)) {
        const m = finder(v, key, value);
        if (m) {
          return m;
        }
      }
    }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable consistent-return  */
/* eslint-disable no-restricted-syntax  */
export const finderStarts = (
  collection: any,
  key: string,
  value: string,
): any => {
  for (const o of collection) {
    for (const [k, v] of Object.entries(o)) {
      // @ts-ignore
      if (k === key && v.startsWith(value)) {
        return o;
      }
      if (Array.isArray(v)) {
        const m = finder(v, key, value);
        if (m) {
          return m;
        }
      }
    }
  }
};
