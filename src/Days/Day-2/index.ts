import * as E from "@effect-ts/system/Either";
import * as L from "@effect-ts/system/List";
import { DailyTask } from "@app/Days";
import { pipe } from "fp-ts/function";

const calculate = (params: string[], f: (policy: PasswordPolicy) => boolean) =>
  pipe(
    params,
    L.from,
    L.map((a) => {
      const regexp = new RegExp(
        "(?<min>[0-9]+)-(?<max>[0-9]+) (?<letter>[a-z]): (?<password>[a-z]+)",
        "gi"
      );

      return (regexp.exec(a)?.groups as unknown) as PasswordPolicy;
    }),
    L.filter((a) => a !== undefined),
    L.filter(f),
    L.length,
    E.right
  );

interface PasswordPolicy {
  min: number;
  max: number;
  letter: string;
  password: string;
}

export const task2: DailyTask = {
  DailyTask: {
    exercise1: (params: string[]) =>
      calculate(params, (policy) => {
        const letterCount =
          policy.password.match(new RegExp(policy.letter, "gi"))?.length || 0;

        return letterCount >= policy.min && letterCount <= policy.max;
      }),
    exercise2: (params: string[]) =>
      calculate(params, (policy) => {
        const minIsValid =
          policy.password.charAt(policy.min - 1) === policy.letter;
        const maxIsValid =
          policy.password.charAt(policy.max - 1) === policy.letter;

        return (minIsValid && !maxIsValid) || (!minIsValid && maxIsValid);
      }),
  },
};
