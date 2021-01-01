import * as T from "@effect-ts/system/Effect";
import * as E from "@effect-ts/system/Either";
import { task as task1 } from "@app/Days/Day-1";
import { task as task2 } from "@app/Days/Day-2";
import { task as task3 } from "@app/Days/Day-3";
import { task as task4 } from "@app/Days/Day-4";
import { task as task5 } from "@app/Days/Day-5";
import { task as task6 } from "@app/Days/Day-6";
import { task as task7 } from "@app/Days/Day-7";
import { task as task8 } from "@app/Days/Day-8";
import { task as task9 } from "@app/Days/Day-9";
import { task as task10 } from "@app/Days/Day-10";
import { task as task11 } from "@app/Days/Day-11";
import { task as task12 } from "@app/Days/Day-12";
import { task as task13 } from "@app/Days/Day-13";

export const day1 = "day-1";
export const day2 = "day-2";
export const day3 = "day-3";
export const day4 = "day-4";
export const day5 = "day-5";
export const day6 = "day-6";
export const day7 = "day-7";
export const day8 = "day-8";
export const day9 = "day-9";
export const day10 = "day-10";
export const day11 = "day-11";
export const day12 = "day-12";
export const day13 = "day-13";

export type Day =
  | typeof day1
  | typeof day2
  | typeof day3
  | typeof day4
  | typeof day5
  | typeof day6
  | typeof day7
  | typeof day8
  | typeof day9
  | typeof day10
  | typeof day11
  | typeof day12
  | typeof day13
  ;

export const getTask = () => T.access(({ DailyTask }: DailyTask) => DailyTask);

export interface DailyTask {
  DailyTask: {
    readonly exercise1: (params: string[]) => E.Either<any, any>;
    readonly exercise2: (params: string[]) => E.Either<any, any>;
  };
}

export const dailyTaskMap = {
  [day1]: task1,
  [day2]: task2,
  [day3]: task3,
  [day4]: task4,
  [day5]: task5,
  [day6]: task6,
  [day7]: task7,
  [day8]: task8,
  [day9]: task9,
  [day10]: task10,
  [day11]: task11,
  [day12]: task12,
  [day13]: task13,
};
