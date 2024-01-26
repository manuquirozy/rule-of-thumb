/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { DisplayContext } from '../context/display.context';
import { useState, useEffect, useContext } from 'react';
import CelebrityCard from '../components/CelebrityCard';
import initialData from '../../public/data.json';
import Dropdown from '../components/Dropdown';

export default function Home() {
  const {
    state: { display },
    dispatch: displayDispatch,
  } = useContext(DisplayContext);
  const [celebrityArray, setCelebrityArray] = useState([]);
  const [isMobile, setIsMobile] = useState(true);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      displayDispatch({ type: 'TOGGLE', payload: 'Grid' });
    } else {
      setIsMobile(false);
    }
  };

  const updateVoteCount = (updatedCelebrity) => {
    const celebrityArrayCopy = [...celebrityArray];
    const celebrityIndex = celebrityArrayCopy.findIndex((element) => element.name === updatedCelebrity.name);
    celebrityArrayCopy[celebrityIndex] = updatedCelebrity;
    setCelebrityArray(celebrityArrayCopy);
    localStorage.setItem('data', JSON.stringify(celebrityArrayCopy));
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      setCelebrityArray(data);
    } else {
      localStorage.setItem('data', JSON.stringify(initialData.data));
    }
  }, []);

  useEffect(() => {
    const displayData = JSON.parse(localStorage.getItem('display'));
    if (displayData) {
      displayDispatch({ type: 'TOGGLE', payload: displayData });
    } else {
      localStorage.setItem('display', JSON.stringify(display));
    }
  }, []);

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
        {celebrityArray.length > 0
          ? celebrityArray.map((celebrity) => (
              <CelebrityCard celebrity={celebrity} display={display} updateVoteCount={updateVoteCount} key={celebrity.name} />
            ))
          : 'Loading...'}
      </div>
    </div>
  );
}
