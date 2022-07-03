import { loggingInstance } from "hooks/useLogging";
const { captureDurationAsync, logTimer, logMessage, LOG_SEVERITY } =
  loggingInstance();

/**
 *
 * @param label used for logging timers
 * @param correlationId optional but use where possible
 * @returns success if reponse ok, !success if response not ok
 */
export const fetchDataAsync = async <TType>(
  label: string,
  input: RequestInfo | URL,
  init?: RequestInit,
  correlationId?: string
): Promise<{ success: boolean; response: FetchResponse<TType> }> => {
  try {
    const timedResponse = await captureDurationAsync(async () =>
      fetch(input, init)
    );
    logTimer(label, timedResponse.duration);

    const { data, errors }: FetchResponse<TType> =
      await timedResponse.result.json();

    if (!timedResponse.result.ok) {
      const errorString = `{${errors.map((e) => e.message).join("\n")}}`;
      logMessage(
        LOG_SEVERITY.WARN,
        errorString,
        "Server returned errors while fetching data",
        correlationId,
        `${fetchDataAsync.name}(${label}, ${input}, ${init ?? ""}, ${
          correlationId ?? ""
        })`
      );
    }

    return { success: timedResponse.result.ok, response: { data, errors } }; // we return data here so callers can action specific errors
  } catch (err) {
    logMessage(
      LOG_SEVERITY.ERROR,
      err.stack,
      `Error fetching data, inner error: ${err.message}`,
      correlationId,
      `${fetchDataAsync.name}(${label}, ${input}, ${init ?? ""}, ${
        correlationId ?? ""
      })`
    );
    return { success: false, response: null };
  }
};

export type FetchResponse<TType> = {
  data?: Omit<TType, "fetchedAt">;
  errors?: Array<{ message: string }>;
};
