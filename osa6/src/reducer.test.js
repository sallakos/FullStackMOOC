import deepFreeze from 'deep-freeze';
import counterReducer from './reducer';

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  const runExpect = (action, toEqual, state = initialState) => {
    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual(toEqual);
  };

  test('should return a proper initial state when called with undefined state', () => {
    // eslint-disable-next-line no-unused-vars
    const state = {};
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('good is incremented', () => {
    const action = {
      type: 'GOOD',
    };
    runExpect(action, {
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test('ok is incremented', () => {
    const action = {
      type: 'OK',
    };
    runExpect(action, {
      good: 0,
      ok: 1,
      bad: 0,
    });
  });

  test('bad is incremented', () => {
    const action = {
      type: 'BAD',
    };
    runExpect(action, {
      good: 0,
      ok: 0,
      bad: 1,
    });
  });

  test('votes are reset', () => {
    const action = {
      type: 'ZERO',
    };
    const state = {
      good: 10,
      ok: 5,
      bad: 3,
    };

    runExpect(
      action,
      {
        good: 0,
        ok: 0,
        bad: 0,
      },
      state
    );
  });
});
