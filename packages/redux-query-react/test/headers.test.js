import { headersChanged } from '../src/headers';
describe('headers changed', () => {
  const one = {
    options: {
      headers: {
        mario: 'mama mia!',
      },
    },
  };
  const two = {
    options: {
      headers: {
        luigi: 'aw no!',
      },
    },
  };

  const three = {
    options: {
      headers: {
        bowser: undefined,
      },
    },
  };

  const four = {
    options: {
      headers: {
        bowser: null,
      },
    },
  };

  it('changes headers when they update', () => {
    expect(headersChanged([one], [two])).toBe(true);
  });

  it('does not change headers when they update', () => {
    expect(headersChanged([one], [one])).toBe(undefined);
  });

  it('handles null and undefined', () => {
    expect(headersChanged([three], [four])).toBe(undefined);
  });
});
