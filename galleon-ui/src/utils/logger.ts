export const GALLEON_SERVICE = "GALLEON";
export const LOG_SEVERITY = {
  DEBUG: "Debug",
  INFO: "Info",
  WARN: "Warn",
  ERROR: "Error",
  FATAL: "Fatal",
};

interface MessagePayload {
  serviceName: string; // = GALLEON_SERVICE
  timestamp: string; // = new Date().toISOString()
  severity: string; // = LOG_SEVERITY.INFO
  functionName: string;
  exception: string;
  message: string;
  correlationId?: string;
}

const logMessage = async (payload: MessagePayload) => {
  const loggerUrl = process.env.REACT_APP_APIM_LOGGER_API + "/Logs" ?? "";
  const requestHeaders: HeadersInit = new Headers();

  requestHeaders.set(
    "Ocp-Apim-Subscription-Key",
    process.env.REACT_APP_APIM_SUBSCRIPTION_KEY ?? ""
  );
  requestHeaders.set("Ocp-Apim-Trace", true.toString());
  requestHeaders.set("Content-Type", "application/json");

  return await fetch(loggerUrl, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify({
      ServiceName: payload.serviceName,
      Environment: process.env.NODE_ENV,
      TimeStamp: payload.timestamp,
      Severity: payload.severity,
      FunctionName: payload.functionName,
      Exception: payload.exception,
      Message: payload.message,
      CorrelationID: payload.correlationId,
    }),
  }).catch((err) => {
    console.log(err);
  });
};

interface CounterPayload {
  serviceName: string; // = GALLEON_SERVICE
  label: string;
  metadata: object;
}

export const COUNTER_LABELS = {
  VISIT: "VISIT",
};

const logCounter = async (payload: CounterPayload) => {
  const loggerUrl =
    process.env.REACT_APP_APIM_LOGGER_API + "/Metrics/Counters" ?? "";
  const requestHeaders: HeadersInit = new Headers();

  requestHeaders.set(
    "Ocp-Apim-Subscription-Key",
    process.env.REACT_APP_APIM_SUBSCRIPTION_KEY ?? ""
  );

  requestHeaders.set("Ocp-Apim-Trace", true.toString());
  requestHeaders.set("Content-Type", "application/json");

  return await fetch(loggerUrl, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify({
      ServiceName: payload.serviceName,
      Environment: process.env.NODE_ENV,
      Label: payload.label,
      Metadata: payload.metadata,
    }),
  }).catch((err) => {
    console.log(err);
  });
};

interface TimerPayload {
  serviceName: string; // = GALLEON_SERVICE
  label: string;
  duration: number;
}

const logTimer = async (payload: TimerPayload) => {
  const loggerUrl =
    process.env.REACT_APP_APIM_LOGGER_API + "/Metrics/Timers" ?? "";
  const requestHeaders: HeadersInit = new Headers();

  requestHeaders.set(
    "Ocp-Apim-Subscription-Key",
    process.env.REACT_APP_APIM_SUBSCRIPTION_KEY ?? ""
  );
  requestHeaders.set("Ocp-Apim-Trace", true.toString());
  requestHeaders.set("Content-Type", "application/json");

  return await fetch(loggerUrl, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify({
      ServiceName: payload.serviceName,
      Environment: process.env.NODE_ENV,
      Label: payload.label,
      Duration: payload.duration,
    }),
  }).catch((err) => {
    console.log(err);
  });
};

export { logMessage, logCounter };
