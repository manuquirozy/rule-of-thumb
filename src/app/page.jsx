"use client"

import CelebrityCard from './components/CelebrityCard';
import data from '../../public/data.json';
import Dropdown from './components/Dropdown';

export default function Home() {
  return (
    <div>
      <div className='mb-8 flex justify-between items-center'>
        <div className='text-[2rem] font-light text-[#464646]'>Previous Rulings</div>
        <Dropdown />
      </div>
      <div className='flex flex-row flex-nowrap tablet:flex-wrap tablet:justify-center overflow-scroll gap-4 tablet:gap-6' id='card-list'>
        {data.data.map((celebrity) => (
          <CelebrityCard celebrity={celebrity} key={celebrity.name} />
        ))}
      </div>
    </div>
  );
}
