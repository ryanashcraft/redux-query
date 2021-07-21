// @flow

import * as React from 'react';

import useRequests from '../../src/hooks/use-requests';

const Card = () => {
  const [{ isPending }] = useRequests([
    {
      url: '/api',
    },
    { url: '/test' },
  ]);

  return <div>{isPending ? 'loading…' : 'loaded'}</div>;
};

export const App = () => {
  return <Card />;
};
