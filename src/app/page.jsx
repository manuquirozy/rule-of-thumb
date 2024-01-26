'use client';

import { useState, useEffect } from 'react';
import CelebrityCard from '../components/CelebrityCard';
import initialData from '../../public/data.json';
import Dropdown from '../components/Dropdown';

export default function Home() {
  const [celebrityArray, setCelebrityArray] = useState([]);
  const [display, setDisplay] = useState('List');
  const [isMobile, setIsMobile] = useState(true);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      setDisplay("Grid");
    } else {
      setIsMobile(false);
    }
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
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <div className='mb-8 flex justify-between items-center'>
        <div className='text-[2rem] font-light text-[#464646]'>Previous Rulings</div>
        {!isMobile && <Dropdown toggleDisplay={setDisplay} display={display} />}
      </div>
      <div className='flex flex-row flex-nowrap tablet:flex-wrap tablet:justify-center overflow-scroll gap-4 tablet:gap-6' id='card-list'>
        {celebrityArray.length > 0
          ? celebrityArray.map((celebrity) => <CelebrityCard celebrity={celebrity} display={display} key={celebrity.name} />)
          : 'No available information'}
      </div>
    </div>
  );
}
