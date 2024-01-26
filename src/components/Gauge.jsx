import { DisplayContext } from '../context/display.context';
import { useContext } from 'react';
import Image from 'next/image';
import thumbsUpIcon from '/public/img/thumbs-up.svg';
import thumbsDownIcon from '/public/img/thumbs-down.svg';
import clsx from 'clsx';

export default function Gauge({ votes }) {
  const {
    state: { display },
  } = useContext(DisplayContext);

  const totalVotes = votes.positive + votes.negative;
  const positivePercentage = ((votes.positive / totalVotes) * 100).toFixed(1);
  const negativePercentage = ((votes.negative / totalVotes) * 100).toFixed(1);

  return (
    <div
      className={clsx('absolute bottom-0 text-[18px] w-full h-[36px] text-white z-20', {
        'desktop:h-[54px] desktop:text-[27px] desktop:leading-[32px]': display === 'List',
      })}
    >
      <div
        className={clsx('absolute flex flex-row items-center pl-[12px] top-[9px]', {
          'desktop:top-[13.5px]': display === 'List',
        })}
      >
        <Image
          src={thumbsUpIcon}
          alt='thumbs down'
          width={16}
          height={16}
          className={clsx('pr-[6px]', { 'desktop:w-[24px] desktop:h-[24px]': display === 'List' })}
        />
        {positivePercentage}%
      </div>
      <div
        className={clsx('absolute flex flex-row items-center justify-end pr-[12px] right-0 top-[9px]', {
          'desktop:top-[13.5px]': display === 'List',
        })}
      >
        {negativePercentage}%
        <Image
          src={thumbsDownIcon}
          alt='thumbs down'
          width={16}
          height={16}
          className={clsx('pl-[6px]', { 'desktop:w-[24px] desktop:h-[24px]': display === 'List' })}
        />
      </div>
      <div className='flex flex-row w-full h-full'>
        <div className='bg-[#3CBBB4]/[0.6]' style={{ flexBasis: `${positivePercentage}%` }}></div>
        <div className='bg-[#F9AD1D]/[0.6]' style={{ flexBasis: `${negativePercentage}%` }}></div>
      </div>
    </div>
  );
}
