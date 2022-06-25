import Logger from "@galleondao/logging-lib";

export const initLogger = (key: string) => {
  return new Logger(key);
};

export const captureDurationAsync = async (
  func: (...args: any) => Promise<any>
): Promise<{ result: any; duration: number }> => {
  var start = Date.now();
  var result = await func();
  var delta = Date.now() - start;

  return { result, duration: delta };
};
