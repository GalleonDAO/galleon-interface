import {
  KNOWN_LABELS,
  KNOWN_SERVICES,
  LOG_SEVERITY,
} from "@galleondao/logging-lib";
import Logger from "@galleondao/logging-lib";

const logger = new Logger(process.env.REACT_APP_APIM_SUBSCRIPTION_KEY);

export const useLogging = () => {
  const captureDurationAsync = async (
    func: (...args: any) => Promise<any>
  ): Promise<{ result: any; duration: number }> => {
    var start = Date.now();
    var result = await func();
    var delta = Date.now() - start;

    return { result, duration: delta };
  };
  const logTimer = (label: string, duration: number) => {
    logger.logTimer({
      serviceName: KNOWN_SERVICES.GALLEON_DAPP,
      environment: process.env.NODE_ENV,
      label: label,
      duration: duration,
    });
  };
  const logCounter = (label: string, metadata?: object) => {
    logger.logCounter({
      serviceName: KNOWN_SERVICES.GALLEON_DAPP,
      environment: process.env.NODE_ENV,
      label: label,
      metadata: metadata,
    });
  };
  const logMessage = (
    severity: string,
    exception: string,
    message: string,
    correlationId?: string,
    functionName?: string
  ) => {
    logger.logMessage({
      serviceName: KNOWN_SERVICES.GALLEON_DAPP,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      severity: severity,
      functionName: functionName ? functionName : 'unavailable',
      exception: exception,
      message: message,
      correlationId: correlationId, //TODO: generate new GUID on null
    });
  };

  return {
    captureDurationAsync,
    logTimer,
    logCounter,
    logMessage,
    KNOWN_LABELS,
    LOG_SEVERITY,
  };
};
