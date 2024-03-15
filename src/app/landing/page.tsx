import React from 'react';
import Link from 'next/link';
import Header from '@/components/header/header';

const contentCopy = [
  {
    subHeading: 'all your applauds in one place',
    heading: 'applaud inbox',
    text: 'A dedicated space to receive and manage all your accolades. Choose which applauds highlight your profile.',
    href: '/login',
    link: 'Get Started',
  },
  {
    subHeading: 'redefining your professional profile',
    heading: 'dynamic profile',
    text: "Beyond a typical CV—showcase your journey, skills, and experiences, validated by the applause you've earned.",
    href: '/login',
    link: 'Get Started',
  },
  {
    subHeading: 'celebrate achievements together',
    heading: 'social feed',
    text: "Engage with the community. Revel in shared successes and accolades. Don't forget to showcase your achievements!",
    href: '/login',
    link: 'Get Started',
  },
];

const Landing = () => {
  return (
    <div className='page-layout'>
      <Header />
      <section className='section-layout'>
        <div className='phoneSEL:hidden title-5 phoneP:title-4'>
          <h1>archive.</h1>
          <h1>applaud.</h1>
          <h1>applaudify.</h1>
        </div>
        <div className='hidden phoneSEL:block title-4 phoneL:title-3 tabletP:title-3 tabletL:title-2 laptopL:title-1'>
          <h1>archive.applaud.</h1>
          <h1>applaudify.</h1>
        </div>
        <div className='flex flex-col gap-4'>
          <p className='title-text'>
            Collect, manage, and showcase your professional testimonials - every
            applaud matters.
          </p>
          <Link
            className='nav-3 nav-2 tabletP:nav-1 underline underline-offset-8'
            href='/login'
          >
            Get Started
          </Link>
        </div>
      </section>
      {contentCopy.map((copy, index) => {
        return (
          <section
            key={index + copy.text}
            className='section-layout'
          >
            <div>
              <h5 className='sub-heading'>{copy.subHeading}</h5>
              <h1 className='heading'>{copy.heading}</h1>
            </div>
            <div className='flex flex-col gap-4'>
              <p className='text'>{copy.text}</p>
              <Link
                className='cta'
                href={copy.href}
              >
                {copy.link}
              </Link>
            </div>
          </section>
        );
      })}
      <footer className='pt-20'>
        <p className='info-3 tabletL:info-2 desktopL:info-1'>
          © 2023-2024 applaudify
        </p>
      </footer>
    </div>
  );
};

export default Landing;
