'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { publishApplaud } from '@/libs/applauds/applaud-actions';
import { useAnimate, animate, stagger } from 'framer-motion';

type PublishButtonProps = {
  slug: string;
};
type AnimationSequence = Parameters<typeof animate>[0];

const PublishButton = ({ slug }: PublishButtonProps) => {
  const router = useRouter();
  const [scope, animate] = useAnimate();

  const randomNumberBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handlePublishClick = () => {
    publishApplaud(slug);
    setTimeout(() => {
      router.refresh();
      window.location.reload();
    }, 1000);

    const sparkles = Array.from({ length: 20 });

    const sparklesAnimation: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: randomNumberBetween(-100, 100),
        y: randomNumberBetween(-100, 100),
        scale: randomNumberBetween(1.5, 5.5),
        opacity: 1,
      },
      {
        duration: 0.4,
        at: '<',
      },
    ]);
    const sparklesFadeOut: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        opacity: 0,
        scale: 0,
      },
      {
        duration: 0.3,
        at: '<',
      },
    ]);
    const sparklesReset: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: 0,
        y: 0,
      },
      {
        duration: 0.000001,
      },
    ]);

    animate([
      ...sparklesReset,
      ['.letter', { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      ['button', { scale: 0.8 }, { duration: 0.1, at: '<' }],
      ['button', { scale: 1 }, { duration: 0.1 }],
      ...sparklesAnimation,
      ['.letter', { y: 0 }, { duration: 0.000001 }],
      ...sparklesFadeOut,
    ]);
  };

  return (
    <div
      ref={scope}
      className='flex justify-center w-full'
    >
      <button
        className='btn mt-20'
        onClick={handlePublishClick}
      >
        <span className='sr-only'>Publish</span>
        <span
          className='block h-8 overflow-hidden'
          aria-hidden
        >
          {['P', 'u', 'b', 'l', 'i', 's', 'h'].map((letter, index) => (
            <span
              data-letter={letter}
              className='letter relative inline-block h-8 leading-8
              after:absolute after:left-0 after:top-full after:h-8
              after:content-[attr(data-letter)]'
              key={`${letter}-${index}`}
            >
              {letter}
            </span>
          ))}
        </span>
        <span
          aria-hidden
          className='rounded-3xl pointer-events-none absolute inset-0 -z-10 block'
        >
          {Array.from({ length: 20 }).map((_, index) => (
            <svg
              className={`absolute logo-ombre left-1/2 top-1/2 opacity-0 sparkle-${index}`}
              key={index}
              viewBox='0 0 122 117'
              width='10'
              height='10'
              // fill='var(--core-logo)'
            >
              <path d='M64.39,2,80.11,38.76,120,42.33a3.2,3.2,0,0,1,1.83,5.59h0L91.64,74.25l8.92,39a3.2,3.2,0,0,1-4.87,3.4L61.44,96.19,27.09,116.73a3.2,3.2,0,0,1-4.76-3.46h0l8.92-39L1.09,47.92A3.2,3.2,0,0,1,3,42.32l39.74-3.56L58.49,2a3.2,3.2,0,0,1,5.9,0Z' />
            </svg>
          ))}
        </span>
      </button>
    </div>
  );
};

export default PublishButton;
