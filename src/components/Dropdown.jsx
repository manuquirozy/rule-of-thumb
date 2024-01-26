import { DisplayContext } from '../context/display.context';
import { useState, useContext } from 'react';
import Image from 'next/image';
import triangleIcon from '/public/img/triangle.svg';
import { UPDATE, DISPLAY } from '../constants';

export default function Dropdown() {
  const {
    state: { display },
    dispatch,
  } = useContext(DisplayContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSelect = (event) => {
    dispatch({ type: UPDATE, payload: event.target.innerHTML });
    localStorage.setItem(DISPLAY, JSON.stringify(event.target.innerHTML));
    toggle();
  };

  return (
    <div className='z-20 text-[0.75em]'>
      <button className='h-8 w-36 bg-white box-border border-2 border-black flex justify-between items-center px-2' onClick={toggle}>
        <span className='w-full text-center'>{display}</span>
        <Image src={triangleIcon} alt='toggle dropdown' height={7} className='mx-2 w-auto' />
      </button>
      <div className={`${isOpen ? 'max-h-16' : 'max-h-0 invisible'} absolute transition-all duration-500 ease-in-out overflow-hidden`}>
        <button onClick={handleSelect} className='h-8 w-36 bg-white box-border border-x-2 border-black grid place-content-center'>
          List
        </button>
        <button onClick={handleSelect} className='h-8 w-36 bg-white box-border border-2 border-black grid place-content-center'>
          Grid
        </button>
      </div>
    </div>
  );
}
