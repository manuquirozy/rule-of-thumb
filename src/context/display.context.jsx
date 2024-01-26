'use client';

import React, { createContext, useReducer } from 'react';

const initialState = {
  display: 'Grid',
};

const TOGGLE = 'TOGGLE';

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE:
      return { ...state, display: action.payload };
    default:
      return state;
  }
};

export const DisplayContext = createContext({ state: initialState, dispatch: () => null });

export const DisplayContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <DisplayContext.Provider value={{ state, dispatch }}>{children}</DisplayContext.Provider>;
};
