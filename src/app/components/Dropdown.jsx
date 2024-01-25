import React, { useState } from 'react';
import Image from 'next/image';
import triangleIcon from '/public/img/triangle.svg';

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState('List');

  console.log(display);

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const onSelect = (event) => {
    setDisplay(event.target.innerHTML)
    toggle();
  }

  return (
    <div className='z-20 text-[0.75em]'>
        <button className='h-8 w-36 bg-white box-border border-2 border-black flex justify-between items-center px-2' onClick={toggle}>
          <span className='w-full text-center'>{display}</span>
          <Image src={triangleIcon} alt='toggle dropdown' width={10.5} height={7} className='mx-2' />
        </button>
        <div className={`${isOpen ? 'max-h-16' : 'max-h-0 invisible'} absolute transition-all duration-500 ease-in-out overflow-hidden`}>
          <button onClick={onSelect} className='h-8 w-36 bg-white box-border border-x-2 border-black grid place-content-center'>
            List
          </button>
          <button onClick={onSelect} className='h-8 w-36 bg-white box-border border-2 border-black grid place-content-center'>
            Grid
          </button>
        </div>
    </div>
  );
}
