import { v4 as guid } from "uuid";
import {
  KNOWN_LABELS,
  KNOWN_SERVICES,
  LOG_SEVERITY,
} from "@galleondao/logging-lib";
import { LoggingV2 } from "@galleondao/logging-lib";

//const logger = new LoggerV2(process.env.REACT_APP_APIM_SUBSCRIPTION_KEY, true);
const logger = new LoggingV2();
process.env.NODE_ENV === "production"
  ? logger.addAzureLogging({
      apiKey: process.env.REACT_APP_APIM_SUBSCRIPTION_KEY,
    })
  : logger.addConsoleLogging();

const loggingFunctions = () => {
  const captureDurationAsync = async <TType>(
    func: (...args: any) => Promise<TType>
  ): Promise<{ result: TType; duration: number }> => {
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
      functionName: functionName ? functionName : logMessage.caller(),
      exception: exception,
      message: message,
      correlationId: correlationId, //TODO: generate new GUID on null
    });
  };

  return {
    getCorrelationId,
    captureDurationAsync,
    logTimer,
    logCounter,
    logMessage,
    KNOWN_LABELS,
    LOG_SEVERITY,
  };
};

//This prevents linter from being angry about using hooks when this is more of a singleton
//Probably can be removed
export const useLogging = () => loggingFunctions();
export const loggingInstance = () => loggingFunctions();
export const getCorrelationId = (): string => {
  return guid();
};
