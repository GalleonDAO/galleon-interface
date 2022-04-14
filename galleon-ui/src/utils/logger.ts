export const GALLEON_SERVICE = "GALLEON.COMMUNITY";
export const LOG_SEVERITY = {
  DEBUG: "Debug",
  INFO: "Info",
  WARN: "Warn",
  ERROR: "Error",
  FATAL: "Fatal",
};

const log = async (
  serviceName: string = GALLEON_SERVICE,
  timestamp: string = new Date().toISOString(),
  severity: string = LOG_SEVERITY.INFO,
  message: string,
  correlationId?: string
) => {
  const loggerUrl = process.env.REACT_APP_APIM_LOGGER_API ?? "";
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
      ServiceName: serviceName,
      TimeStamp: timestamp,
      Severity: severity,
      Message: message,
      CorrelationID: correlationId,
    }),
  }).catch((err) => {
    console.log(err);
  });
};

export default log;
