import Image from 'next/image';
import thumbsUpIcon from '/public/img/thumbs-up.svg';
import thumbsDownIcon from '/public/img/thumbs-down.svg';
import { intervalToDuration } from 'date-fns';
import clsx from 'clsx';

export default function VoteButtons({ category, lastUpdated, display }) {
  const categoryCapitalized = category.charAt(0).toUpperCase() + category.slice(1);

  const diff = intervalToDuration({
    start: new Date(lastUpdated),
    end: new Date(),
  });

  const greatestPeriod = Object.keys(diff).find((element) => diff[element] > 0);
  const value = diff[greatestPeriod];

  const outputString = `${value} ${value === 1 ? greatestPeriod?.slice(0, -1) : greatestPeriod} ago in ${categoryCapitalized}`;

  return (
    <div className={clsx('flex flex-col items-end gap-[12px]', { 'pt-[8px]': display === 'List' })}>
      <span className='desktop:text-[12px]'>{outputString}</span>
      <div className='flex items-center gap-[12px] desktop:gap-3'>
        <button
          className={clsx('grid place-items-center w-[30px] h-[30px]', { 'desktop:w-[45px] desktop:h-[45px]': display === 'List' })}
          aria-label='thumbs up'
        >
          <Image
            src={thumbsUpIcon}
            alt='thumbs up'
            width={16}
            height={16}
            className={display === 'List' && 'desktop:w-[24px] desktop:h-[24px]'}
          />
        </button>
        <button
          className={clsx('grid place-items-center w-[30px] h-[30px]', { 'desktop:w-[45px] desktop:h-[45px]': display === 'List' })}
          aria-label='thumbs down'
        >
          <Image
            src={thumbsDownIcon}
            alt='thumbs down'
            width={16}
            height={16}
            className={display === 'List' && 'desktop:w-[24px] desktop:h-[24px]'}
          />
        </button>
        <button className='bg-black/[0.6] border border-white text-xl desktop:text-[0.8rem] w-[107px] h-[38px] desktop:text-2xl'>
          Vote Now
        </button>
      </div>
    </div>
  );
}
