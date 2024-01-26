/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { DisplayContext } from '../context/display.context';
import { DataContext } from '../context/data.context';
import { useState, useEffect, useContext } from 'react';
import CelebrityCard from '../components/CelebrityCard';
import Dropdown from '../components/Dropdown';
import { GRID, UPDATE } from '../constants';

export default function Home() {
  const { dispatch: displayDispatch } = useContext(DisplayContext);

  const {
    state: { data },
  } = useContext(DataContext);

  const [isMobile, setIsMobile] = useState(true);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      displayDispatch({ type: UPDATE, payload: GRID });
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <div className='mb-8 flex justify-between items-center'>
        <div className='text-[2rem] font-light text-[#464646]'>Previous Rulings</div>
        {!isMobile && <Dropdown />}
      </div>
      <div className='flex flex-row flex-nowrap tablet:flex-wrap tablet:justify-center overflow-scroll gap-4 tablet:gap-6' id='card-list'>
        {data.length > 0 ? data.map((celebrity) => <CelebrityCard celebrity={celebrity} key={celebrity.name} />) : 'Loading...'}
      </div>
    </div>
  );
}
