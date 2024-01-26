import { DisplayContext } from '../context/display.context';
import { useState, useContext } from 'react';
import Image from 'next/image';
import thumbsUpIcon from '/public/img/thumbs-up.svg';
import thumbsDownIcon from '/public/img/thumbs-down.svg';
import { intervalToDuration } from 'date-fns';
import clsx from 'clsx';

export default function VoteButtons({ celebrity, updateVoteCount }) {
  const { state: {display} } = useContext(DisplayContext);
  const { category, lastUpdated, name } = celebrity;
  const [vote, setVote] = useState(undefined);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categoryCapitalized = category.charAt(0).toUpperCase() + category.slice(1);

  const diff = intervalToDuration({
    start: new Date(lastUpdated),
    end: new Date(),
  });

  const greatestPeriod = Object.keys(diff).find((element) => diff[element] > 0);
  const value = diff[greatestPeriod];

  const outputString = `${value} ${value === 1 ? greatestPeriod?.slice(0, -1) : greatestPeriod} ago in ${categoryCapitalized}`;

  const handleClick = (event) => {
    if (event.target.alt === vote) {
      setVote(undefined);
    } else {
      setVote(event.target.alt);
    }
  };

  const onSubmit = () => {
    if (!isSubmitted) {
      if (vote === 'thumbs up') {
        celebrity.votes.positive++;
      } else {
        celebrity.votes.negative++;
      }
      updateVoteCount(celebrity);
      setVote(undefined);
    }

    setIsSubmitted((prevState) => !prevState);
  };

  return (
    <div className={clsx('flex flex-col items-end gap-[12px]', { 'pt-[8px]': display === 'List' })}>
      <span className='desktop:text-[12px] line-clamp-1'>{isSubmitted ? 'Thank you for voting!' : outputString}</span>
      <div className='flex items-center gap-[12px] desktop:gap-3'>
        <button
          onClick={handleClick}
          className={clsx(
            'grid place-items-center w-[30px] h-[30px]',
            { 'desktop:w-[45px] desktop:h-[45px]': display === 'List' },
            { 'border border-white': vote === 'thumbs up' },
            { invisible: isSubmitted }
          )}
          aria-label='thumbs up'
          disabled={isSubmitted}
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
          onClick={handleClick}
          className={clsx(
            'grid place-items-center w-[30px] h-[30px]',
            { 'desktop:w-[45px] desktop:h-[45px]': display === 'List' },
            { 'border border-white': vote === 'thumbs down' },
            { invisible: isSubmitted }
          )}
          aria-label='thumbs down'
          disabled={isSubmitted}
        >
          <Image
            src={thumbsDownIcon}
            alt='thumbs down'
            width={16}
            height={16}
            className={display === 'List' && 'desktop:w-[24px] desktop:h-[24px]'}
          />
        </button>
        <button
          onClick={onSubmit}
          className={clsx(
            'border border-white text-xl desktop:text-[0.8rem] w-[107px] h-[38px] desktop:text-2xl',
            { 'bg-[#303030]/[0.6]': vote },
            { 'bg-black/[0.6] ': !vote }
          )}
          disabled={!vote && !isSubmitted}
        >
          {isSubmitted ? 'Vote Again' : 'Vote Now'}
        </button>
      </div>
    </div>
  );
}
