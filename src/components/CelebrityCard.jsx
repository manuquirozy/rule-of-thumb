import { DisplayContext } from '../context/display.context';
import { useContext } from 'react';
import Image from 'next/image';
import thumbsUpIcon from '/public/img/thumbs-up.svg';
import thumbsDownIcon from '/public/img/thumbs-down.svg';
import Gauge from './Gauge';
import clsx from 'clsx';
import VoteButtons from './VoteButtons';
import { LIST, GRID } from '../constants';

export default function CelebrityCard({ celebrity }) {
  const {
    state: { display },
  } = useContext(DisplayContext);

  return (
    <div
      className={clsx(
        'relative shrink-0',
        { 'w-full h-[10.25rem] desktop:h-[9.5rem]': display === LIST },
        { 'w-[25rem] desktop:w-[348px] h-[25rem] desktop:h-[348px]': display === GRID }
      )}
    >
      <Image
        src={`/img/${celebrity.picture}`}
        alt={celebrity.name}
        sizes='100vw'
        className={clsx('absolute object-cover h-full', { 'w-auto': display === LIST }, { 'w-full': display === GRID })}
        width={500}
        height={300}
      />
      <div
        className={clsx(
          'relative shrink-0 z-10',
          { 'w-full h-[10.25rem] desktop:h-[9.5rem] bg-gradient-grey-desktop': display === LIST },
          { 'w-[25rem] desktop:w-[348px] h-[25rem] desktop:h-[348px]': display === GRID }
        )}
      >
        <div
          className={clsx(
            'relative flex z-10 box-border  text-white',
            { 'flex-col justify-end w-[25rem] h-[25rem] desktop:w-[348px] desktop:h-[348px] px-[36px] pb-[48px]': display === GRID },
            { 'pr-[12px] desktop:pr-[14px]': display === LIST }
          )}
        >
          {celebrity.votes.positive >= celebrity.votes.negative ? (
            <div
              className={clsx('grid place-items-center w-[30px] h-[30px] bg-[#3CBBB4] bg-opacity-80 absolute left-0', {
                'top-0 desktop:w-[45px] desktop:h-[45px]': display === LIST,
                'bottom-[175px]': display === GRID,
              })}
            >
              <Image
                src={thumbsUpIcon}
                alt='thumbs up'
                width={16}
                height={16}
                className={display === LIST ? 'desktop:w-[24px] desktop:h-[24px]' : ''}
              />
            </div>
          ) : (
            <div
              className={clsx('grid place-items-center w-[30px] h-[30px] bg-[#FBBD4A] absolute left-0', {
                'top-0 desktop:w-[45px] desktop:h-[45px]': display === LIST,
                'bottom-[175px]': display === GRID,
              })}
            >
              <Image
                src={thumbsDownIcon}
                alt='thumbs down'
                width={16}
                height={16}
                className={display === LIST ? 'desktop:w-[24px] desktop:h-[24px]' : ''}
              />
            </div>
          )}
          <div
            className={clsx(
              'tablet:mb-2',
              { 'mb-4 pl-[calc(10.25rem-8px)] desktop:pl-[calc(9.5rem-8px)] pr-8': display === LIST },
              { 'mb-5': display === GRID }
            )}
          >
            <div
              className={clsx(
                'text-[2.5rem] tablet:text-[2.15rem] leading-[3rem] tablet:leading-[2.5rem]',
                { 'mb-5 desktop:mb-0 desktop:leading-[3.5rem] line-clamp-1': display === LIST },
                { 'tablet:mb-3 desktop:mb-1  line-clamp-2': display === GRID }
              )}
            >
              {celebrity.name}
            </div>
            <p className='text-[1.25rem] tablet:text-[1rem] line-clamp-2 h-13 tablet:h-10 desktop:h-8'>{celebrity.description}</p>
          </div>
          <VoteButtons celebrity={celebrity} />
        </div>
        <Gauge votes={celebrity.votes} />
      </div>
    </div>
  );
}
