/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useEffect, useContext } from 'react';
import { DisplayContext } from '../context/display.context';
import { GRID, UPDATE } from '../constants';

export default function useResponsiveDisplay(breakpoint = 768) {
  const { dispatch } = useContext(DisplayContext);
  const [isMobile, setIsMobile] = useState(true);

  const handleResize = () => {
    setIsMobile(window.innerWidth < breakpoint);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  useEffect(() => {
    if (isMobile) {
      dispatch({ type: UPDATE, payload: GRID });
    }
  }, [isMobile]);

  return isMobile;
}
