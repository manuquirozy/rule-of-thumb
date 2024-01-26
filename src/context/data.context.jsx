'use client';

import React, { createContext, useReducer, useEffect } from 'react';
import defaultData from '../../public/data.json';
import { INCREMENT, REPLACE, DATA } from '../constants';

const emptyState = {
  data: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case REPLACE:
      return action.payload;
    case INCREMENT:
      const dataCopy = [...state.data];
      const celebrityIndex = dataCopy.findIndex((element) => element.name === action.payload.name);
      if (celebrityIndex !== -1) {
        const currentDate = new Date();
        const formattedDateString = currentDate.toISOString();

        dataCopy[celebrityIndex] = {
          ...dataCopy[celebrityIndex],
          lastUpdated: formattedDateString,
          votes: {
            ...dataCopy[celebrityIndex].votes,
            [action.payload.vote]: dataCopy[celebrityIndex].votes[action.payload.vote] + 1,
          },
        };
      }
      return { ...state, data: dataCopy };
    default:
      return state;
  }
};

export const DataContext = createContext({ state: emptyState, dispatch: () => null });

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, emptyState);

  useEffect(() => {
    const storedData = localStorage.getItem(DATA);
    if (storedData !== null) {
      dispatch({ type: REPLACE, payload: JSON.parse(storedData) });
    } else {
      dispatch({ type: REPLACE, payload: defaultData });
    }
  }, []);

  useEffect(() => {
    if (state !== emptyState) {
      localStorage.setItem(DATA, JSON.stringify(state));
    }
  }, [state]);

  return <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>;
};
