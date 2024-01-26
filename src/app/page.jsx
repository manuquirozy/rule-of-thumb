'use client';

import { DataContext } from '../context/data.context';
import { useContext } from 'react';
import useResponsiveDisplay from '../hooks/useResponsiveDisplay';
import CelebrityCard from '../components/CelebrityCard';
import Dropdown from '../components/Dropdown';

export default function Home() {
  const {
    state: { data },
  } = useContext(DataContext);

  const isMobile = useResponsiveDisplay();

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
