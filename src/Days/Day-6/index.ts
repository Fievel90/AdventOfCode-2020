import * as E from "@effect-ts/system/Either";
import * as L from "@effect-ts/system/List";
import { pipe } from "fp-ts/function";
import { DailyTask } from "@app/Days";
import { intersect } from "@app/Days/Day-6/intersect";

const groupSeparator = "|";
const personSeparator = " ";

const calculateExercise1 = (params: string[]) => pipe(
  params,
  L.from,
  L.reduce("", (acc, value) => {
    if (value.length === 0) {
      acc += groupSeparator;
    }
    acc += value.trim();

    return acc;
  }),
  (a) => a.trim().split(groupSeparator),
  L.from,
  L.map((a) => [...new Set(a.split(""))]),
  L.map((a) => a.length),
  L.reduce(0, (acc, value) => {
    acc += value;

    return acc;
  }),
  E.right
);

const calculateExercise2 = (params: string[]) => pipe(
  params,
  L.from,
  L.reduce("", (acc, value) => {
    if (value.length === 0) {
      acc = acc.trim() + groupSeparator;
    } else {
      acc += value.trim() + personSeparator;
    }

    return acc;
  }),
  (a) => a.trim().split(groupSeparator),
  L.from,
  L.map((a) => a.split(personSeparator)),
  L.map((a) => a.map((q) => [...new Set(q.split(""))])),
  L.map((a) => intersect(...a)),
  L.map((a) => a.length),
  L.reduce(0, (acc, value) => {
    acc += value;

    return acc;
  }),
  E.right
);

export const task6: DailyTask = {
  DailyTask: {
    exercise1: (params: string[]) => calculateExercise1(params),
    exercise2: (params: string[]) => calculateExercise2(params),
  },
};