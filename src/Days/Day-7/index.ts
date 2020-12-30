import * as E from "@effect-ts/system/Either";
import * as L from "@effect-ts/system/List";
import { pipe } from "fp-ts/function";
import { DailyTask } from "@app/Days";

interface Bag {
  name: string
  quantity: number,
  children: Bag[]
}

const mainBagRegExp = new RegExp("(?<name>[a-z ]+)bags? contain", "gi");
const subBagRegExp = new RegExp("(?<bag>(?<quantity>[0-9]+) (?<name>[a-z ]+) bags?)", "gi");

const parseBagRow = (row: string) => {
  const name = Array.from(row.matchAll(mainBagRegExp))
    .reduce((acc, match) => {
      acc = match?.groups?.name.trim() || '';
      return acc;
    }, "");

  const children = Array.from(row.matchAll(subBagRegExp))
    .map((match) => ({
      name: match?.groups?.name.trim() || '',
      quantity: match?.groups?.quantity ? parseInt(match?.groups?.quantity, 10) : 0,
    } as Bag));

  return {
    name: name,
    quantity: 1,
    children: children,
  } as Bag;
};

const findChild = (name: string, bags: readonly Bag[]) => bags.find((bag) => bag.name === name);

const buildChildren = (children: readonly Bag[], bags: readonly Bag[]): Bag[] =>
  children.map((child) => {
    const children = findChild(child.name, bags)?.children || [];

    return {
      name: child.name,
      quantity: child.quantity,
      children: buildChildren(children, bags)
    };
  });

const buildTree = (bags: readonly Bag[]): readonly Bag[] =>
  bags.map((bag) => ({
    name: bag.name,
    quantity: bag.quantity,
    children: buildChildren(bag.children, bags),
  }));

const findInTree = (needle: string, haystack: Bag): boolean => {
  if (haystack.name === needle) {
    return true;
  }

  if (haystack.children.length > 0) {
    const res = haystack.children.reduce((acc, value) => {
      return acc || findInTree(needle, value);
    }, false);

    return res;
  }

  return false;
};

const visit = (needle: string, haystack: readonly Bag[]) => {
  return haystack.filter((value) => {
    return findInTree(needle, value);
  });
};

const countBags = (bags: Bag[]) => {
  return bags.reduce((acc, value) => {
    if (value.children.length > 0) {
      acc += value.quantity * countBags(value.children);
    }

    acc += value.quantity;

    return acc;
  }, 0);
}

const countTotalBags = (needle: string, haystack: readonly Bag[]) => {
  const children = findChild(needle, haystack)?.children || [];

  return countBags(children);
};

export const task7: DailyTask = {
  DailyTask: {
    exercise1: (params: string[]) => pipe(
      params,
      L.from,
      L.map((a) => parseBagRow(a)),
      L.toArray,
      buildTree,
      (a) => visit('shiny gold', a),
      (a) => a.length - 1,
      E.right
    ),
    exercise2: (params: string[]) => pipe(
      params,
      L.from,
      L.map((a) => parseBagRow(a)),
      L.toArray,
      buildTree,
      (a) => countTotalBags('shiny gold', a),
      E.right
    ),
  },
};