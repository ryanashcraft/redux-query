// @flow

import * as React from 'react';
import { getQueryKey } from 'redux-query';
import type { QueryConfig } from 'redux-query/types.js.flow';
import { headersChanged } from '../headers';

const identity = x => x;

/**
 * Other hooks are guaranteed to only receive a new Redux action if and only if the query key of
 * the provided queryConfig changes.
 */
const useMemoizedQueryConfig = (
  providedQueryConfig: ?QueryConfig,
  transform: (?QueryConfig) => ?QueryConfig = identity,
): ?QueryConfig => {
  const [queryConfig, setQueryConfig] = React.useState(
    providedQueryConfig ? transform(providedQueryConfig) : null,
  );
  const previousQueryKey = React.useRef(getQueryKey(providedQueryConfig));
  const previousQueryConfig = React.useRef(providedQueryConfig);

  React.useEffect(() => {
    const queryKey = getQueryKey(providedQueryConfig);

    if (
      queryKey !== previousQueryKey.current ||
      headersChanged([queryConfig], [previousQueryConfig.current])
    ) {
      previousQueryKey.current = queryKey;
      previousQueryConfig.current = queryConfig;
      setQueryConfig(providedQueryConfig ? transform(providedQueryConfig) : null);
    }
  }, [providedQueryConfig, transform]);

  return queryConfig;
};

export default useMemoizedQueryConfig;
