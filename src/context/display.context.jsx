'use client';

import React, { createContext, useReducer, useEffect } from 'react';
import { GRID, UPDATE, DISPLAY } from '../constants';

const initialState = {
  display: GRID,
};

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE:
      return { ...state, display: action.payload };
    default:
      return state;
  }
};

export const DisplayContext = createContext({ state: initialState, dispatch: () => null });

export const DisplayContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedDisplay = localStorage.getItem(DISPLAY);
    if (storedDisplay !== null) {
      dispatch({ type: UPDATE, payload: JSON.parse(storedDisplay).display });
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem(DISPLAY, JSON.stringify(state));
    }
  }, [state]);

  return <DisplayContext.Provider value={{ state, dispatch }}>{children}</DisplayContext.Provider>;
};
