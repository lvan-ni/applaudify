'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import backSmall from '@/assets/nav/back-small.png';
import backLarge from '@/assets/nav/back-large.png';

const BackButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <button
      onClick={goBack}
      className='cursor-pointer flex py-2.5'
    >
      <Image
        src={backLarge}
        alt='back'
        width={26}
        className='tabletP:hidden'
      ></Image>
      <Image
        src={backSmall}
        alt='back'
        width={32}
        className='phoneSEP:hidden tabletP:block'
      ></Image>
    </button>
  );
};

export default BackButton;
