'use client';
import React from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import google from '@/assets/login/google.png';
import github from '@/assets/login/github.png';
import linkedin from '@/assets/login/linkedin.png';
import BackButton from '@/components/button/back-button';

const loginLinks = [
  {
    login: 'Continue with LinkedIn',
    onclick: () => signIn('linkedin', { callbackUrl: '/home' }),
    imageSrc: linkedin,
    alt: 'linkedin-icon',
  },
  {
    login: 'Continue with GitHub',
    onclick: () => signIn('github', { callbackUrl: '/home' }),
    imageSrc: github,
    alt: 'github-icon',
  },
  {
    login: 'Continue with Google',
    onclick: () => signIn('google', { callbackUrl: '/home' }),
    imageSrc: google,
    alt: 'google-icon',
  },
];

const Login = () => {
  return (
    <div className='page-layout'>
      <header className='flex w-full'>
        <BackButton />
      </header>
      <section className='flex flex-col items-center'>
        <h1 className='title-5 phoneP:title-4 tabletP:title-3'>applaudify</h1>
        <h3 className='nav-6 phoneP:nav-5 tabletP:title-5'>login / signup</h3>
      </section>
      <section className='flex flex-col py-10 gap-10 underline underline-offset-8'>
        {loginLinks.map((link, index) => {
          return (
            <button
              key={index + link.alt}
              onClick={link.onclick}
              className='flex justify-start gap-5 nav-4 phoneP:nav-3 tabletP:nav-2'
            >
              <Image
                src={link.imageSrc}
                alt={link.alt}
                width={24}
              ></Image>
              {link.login}
            </button>
          );
        })}
      </section>
    </div>
  );
};

export default Login;
