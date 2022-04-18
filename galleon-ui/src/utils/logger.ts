import Logger from "@galleondao/logging-lib";

export const initLogger = (key: string) => {
  return new Logger(key);
};
