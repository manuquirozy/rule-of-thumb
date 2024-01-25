import Image from 'next/image';
import thumbsUpIcon from '/public/img/thumbs-up.svg';
import thumbsDownIcon from '/public/img/thumbs-down.svg';

export default function Gauge({ votes }) {
  const totalVotes = votes.positive + votes.negative;
  const positivePercentage = ((votes.positive / totalVotes) * 100).toFixed(1);
  const negativePercentage = ((votes.negative / totalVotes) * 100).toFixed(1);

  return (
    <div className='absolute bottom-0 text-[18px] w-full h-[36px] text-white'>
      <div className='absolute flex flex-row items-center pl-[12px] top-[7.2px]'>
        <Image src={thumbsUpIcon} alt='thumbs down' width={16} height={16} className='pr-[6px]' />
        {positivePercentage}%
      </div>
      <div className=' absolute flex flex-row items-center justify-end pr-[12px] right-0 top-[7.2px]'>
        {negativePercentage}%
        <Image src={thumbsDownIcon} alt='thumbs down' width={16} height={16} className='pl-[6px]' />
      </div>
      <div className='flex flex-row w-full h-full'>
        <div className='bg-[#3CBBB4]/[0.6]' style={{ flexBasis: `${positivePercentage}%` }}></div>
        <div className='bg-[#F9AD1D]/[0.6]' style={{ flexBasis: `${negativePercentage}%` }}></div>
      </div>
    </div>
  );
}
