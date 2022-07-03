import { TransactionTypes } from "ethers/lib/utils";
import { loggingInstance } from "hooks/useLogging";
const { captureDurationAsync, logTimer, logMessage, LOG_SEVERITY } =
  loggingInstance();

/**
 *
 * @param label used for logging timers
 * @param correlationId optional but use where possible
 * @returns success if reponse ok, !success if response not ok
 */
export const fetchDataAsync = async <TType = any>(
  label: string,
  input: RequestInfo | URL,
  init?: RequestInit,
  correlationId?: string
): Promise<{ success: boolean; response: FetchResponse<TType> }> => {
  try {
    const typedResponse: FetchResponse<TType> = {
      status: 0,
    };

    const timedResponse = await captureDurationAsync(
      async (): Promise<Response> => {
        return fetch(input, init);
      }
    );
    logTimer(label, timedResponse.duration);

    typedResponse.status = timedResponse.result.status;
    const json = await timedResponse.result.json();

    if (!timedResponse.result.ok) {
      //This handling isn't ideal but allows for errors to be returned in a non restful fashion
      typedResponse.errors = [];
      if (timedResponse.result.statusText.length > 0) {
        typedResponse.errors.push({ message: timedResponse.result.statusText });
      }
      if (json) {
        typedResponse.errors.push({ message: JSON.stringify(json) });
      }

      const errorString = `{${typedResponse.errors
        .map((e) => e.message)
        .join("\n")}}`;
      logMessage(
        LOG_SEVERITY.WARN,
        errorString,
        "Server returned errors while fetching data",
        correlationId,
        `${fetchDataAsync.name}(${label}, ${input}, ${init ?? ""}, ${
          correlationId ?? ""
        })`
      );
    } else {
      typedResponse.data = json as TType;
    }

    return { success: timedResponse.result.ok, response: typedResponse }; // we return data here so callers can action specific errors
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
  status: number;
  data?: TType;
  errors?: Array<{ message: string }>;
};
