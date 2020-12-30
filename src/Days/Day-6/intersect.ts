export const intersect = <T>(...arr: T[][]): T[] => {
  const intersection = arr.shift() || [];
  return arr.reduce((acc, value) => acc.filter(x => value.includes(x)), intersection);
};
