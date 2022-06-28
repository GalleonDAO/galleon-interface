import Logger from "@galleondao/logging-lib";

export const initLogger = (key: string, useConsoleLogging?: boolean) => {
  return new Logger(key, useConsoleLogging);
};

export const captureDurationAsync = async (
  func: (...args: any) => Promise<any>
): Promise<{ result: any; duration: number }> => {
  var start = Date.now();
  var result = await func();
  var delta = Date.now() - start;

  return { result, duration: delta };
};
