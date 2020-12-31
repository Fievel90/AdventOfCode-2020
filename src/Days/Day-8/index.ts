import * as L from "@effect-ts/system/List";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { DailyTask } from "@app/Days";
import { ParseCommandError } from "@app/Days/Day-8/Error/ParseCommandError";

enum Operation {
  NOP = 'nop',
  ACC = 'acc',
  JMP = 'jmp',
}

enum Sign {
  PLUS = '+',
  MINUS = '-',
}

interface Command {
  operation: Operation
  sign: Sign
  value: number
}

interface Executed {
  executed: boolean
}

type ExecutedCommand = Command & Executed;

const parseCommand = (command: string): E.Either<ParseCommandError, ExecutedCommand> => {
  const regExp = new RegExp("(?<command>nop|acc|jmp) (?<sign>[+-])(?<value>[0-9]+)", "gi");

  const match = regExp.exec(command);
  if (! match || ! match.groups) {
    return E.left(new ParseCommandError(`Unrecognized command "${command}"`));
  }

  return E.right({
    operation: match.groups.command,
    sign: match.groups.sign,
    value: parseInt(match.groups.value, 10),
  } as ExecutedCommand);
};

const resolveArg = (base: number, command: Command) => {
  switch (command.sign) {
    case Sign.PLUS:
      return base + command.value;
    case Sign.MINUS:
      return base - command.value;
  }
};

const executeCommands = (commands: readonly ExecutedCommand[]) => {
  let accumulator = 0;
  let loopDetected = false;

  for (let i = 0; i < commands.length;) {
    const command = commands[i];

    if (command.executed) {
      loopDetected = true;
      break;
    }
    command.executed = true;

    switch (command.operation) {
      case Operation.NOP:
        ++i;
        break;
      case Operation.ACC:
        accumulator = resolveArg(accumulator, command);
        ++i;
        break;
      case Operation.JMP:
        i = resolveArg(i, command);
        break;
    }
  }

  return { accumulator, loopDetected };
};

const fixProgram = (commands: readonly ExecutedCommand[]) => {
  let fixedCommands = JSON.parse(JSON.stringify(commands));
  let lastCheckedIndex = 0;

  while (true) {
    const result = executeCommands(fixedCommands);
    if (! result.loopDetected) {
      return result;
    }

    fixedCommands = JSON.parse(JSON.stringify(commands));

    for (let i = lastCheckedIndex; i < fixedCommands.length; ++i) {
      if (fixedCommands[i].operation === Operation.NOP) {
        lastCheckedIndex = i + 1;
        fixedCommands[i].operation = Operation.JMP;
        break;
      } else if (fixedCommands[i].operation === Operation.JMP) {
        lastCheckedIndex = i + 1;
        fixedCommands[i].operation = Operation.NOP;
        break;
      }
    }
  }
};

export const task: DailyTask = {
  DailyTask: {
    exercise1: (params: string[]) => pipe(
      params,
      L.from,
      L.map((a) => parseCommand(a)),
      L.toArray,
      E.sequenceArray,
      E.map((a) => executeCommands(a)),
      E.map(({ accumulator }) => accumulator),
    ),
    exercise2: (params: string[]) => pipe(
      params,
      L.from,
      L.map((a) => parseCommand(a)),
      L.toArray,
      E.sequenceArray,
      E.map((a) => fixProgram(a)),
      E.map(({ accumulator }) => accumulator),
    ),
  },
};