import * as T from "@effect-ts/system/Effect";
import * as Ex from "@effect-ts/system/Exit";
import { pipe } from "fp-ts/function";
import { DailyTask, dailyTaskMap, Day } from "@app/Days";
import { InputProvider } from "@app/Provider/Input/InputProvider";
import { FileSystemInputProvider } from "@app/Provider/Input/FileSystemInputProvider";
import { main } from "@app/Program";

const day: Day = process.argv[2] as Day;

const program = pipe(
  main(day),
  T.provide<InputProvider>(FileSystemInputProvider),
  T.provide<DailyTask>(dailyTaskMap[day]),
  T.result,
  T.map(Ex.untraced),
  T.runPromise
);

program.then((a) => console.log(a)).catch((a) => console.log(a));
