// @flow
import type { QueryConfig } from 'redux-query/types.js.flow';

export const headersChanged = (
  queryConfigs: Array<QueryConfig>,
  previousQueryConfigs: Array<QueryConfig>,
) => {
  for (let i = 0; i < queryConfigs.length; i++) {
    if (
      previousQueryConfigs[i] &&
      queryConfigs[i] &&
      previousQueryConfigs[i].options &&
      queryConfigs[i].options
    ) {
      const prevHeaders = previousQueryConfigs[i].options.headers;
      const headers = queryConfigs[i].options.headers;

      if (prevHeaders != null && headers != null) {
        const prevHeaderValues = Object.values(prevHeaders);
        const diffHeaders = Object.values(headers).some(function(value, i) {
          return prevHeaderValues[i] != value;
        });
        if (diffHeaders) {
          return true;
        }
      }
    }
  }
};
