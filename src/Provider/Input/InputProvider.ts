import * as T from "@effect-ts/system/Effect";
import { Day } from "@app/Days";

export const getInput = (day: Day) =>
  T.access(({ InputProvider }: InputProvider) => InputProvider.getInput(day));

export interface InputProvider {
  InputProvider: {
    readonly getInput: (day: Day) => T.Effect<any, any, any>;
  };
}
