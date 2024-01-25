import Image from 'next/image';
import thumbsUpIcon from '/public/img/thumbs-up.svg';
import thumbsDownIcon from '/public/img/thumbs-down.svg';
import { intervalToDuration } from 'date-fns';
import Gauge from './Gauge';

export default function CelebrityCard({ celebrity }) {
  const categoryCapitalized = celebrity.category.charAt(0).toUpperCase() + celebrity.category.slice(1);

  const diff = intervalToDuration({
    start: new Date(celebrity.lastUpdated),
    end: new Date(),
  });

  const greatestPeriod = Object.keys(diff).find((element) => diff[element] > 0);
  const value = diff[greatestPeriod];

  const outputString = `${value} ${value === 1 ? greatestPeriod?.slice(0, -1) : greatestPeriod} ago in ${categoryCapitalized}`;

  return (
    <div className='relative w-[25rem] h-[25rem] desktop:w-[348px] desktop:h-[348px] shrink-0'>
      <Image
        src={`/img/${celebrity.picture}`}
        alt={celebrity.name}
        sizes='100vw'
        className='absolute object-cover w-full h-full'
        width={500}
        height={300}
      />
      <div className='relative flex flex-col justify-end z-10 box-border w-[25rem] h-[25rem] desktop:w-[348px] desktop:h-[348px] text-white px-[36px] pb-[48px]'>
        {celebrity.votes.positive > celebrity.votes.negative ? (
          <div className='grid place-items-center w-[30px] h-[30px] bg-[#3CBBB4] bg-opacity-80 absolute left-0 bottom-[175px]'>
            <Image src={thumbsUpIcon} alt='thumbs up' width={16} height={16} />
          </div>
        ) : (
          <div className='grid place-items-center w-[30px] h-[30px] bg-[#FBBD4A] absolute left-0 bottom-[175px]'>
            <Image src={thumbsDownIcon} alt='thumbs down' width={16} height={16} />
          </div>
        )}
        <div className='mb-4 tablet:mb-2'>
          <div className='text-[2.5rem] tablet:text-[2.15rem] leading-[3rem] tablet:leading-[2.5rem] tablet:mb-3 desktop:mb-1 line-clamp-2'>
            {celebrity.name}
          </div>
          <p className='text-[1.25rem] tablet:text-[1rem] line-clamp-2 h-13 tablet:h-10 desktop:h-8'>{celebrity.description}</p>
        </div>
        <div className='flex flex-col items-end gap-[12px] '>
          <span className='desktop:text-[12px]'>{outputString}</span>
          <div className='flex items-center gap-[12px] desktop:gap-3'>
            <button className='grid place-items-center w-[30px] h-[30px]' aria-label='thumbs up'>
              <Image src={thumbsUpIcon} alt='thumbs up' width={16} height={16} />
            </button>
            <button className='grid place-items-center w-[30px] h-[30px]' aria-label='thumbs down'>
              <Image src={thumbsDownIcon} alt='thumbs down' width={16} height={16} />
            </button>
            <button className='bg-black/[0.6] border border-white text-xl desktop:text-[0.8rem] w-[107px] h-[38px] desktop:text-2xl'>
              Vote Now
            </button>
          </div>
        </div>
      </div>
      <Gauge votes={celebrity.votes} />
    </div>
  );
}
