import Logger from "@galleondao/logging-lib";

export const initLogger = (key: string, useConsoleLogging?: boolean) => {
  return new Logger(key, useConsoleLogging);
};
