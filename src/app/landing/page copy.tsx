import React from 'react';
import Link from 'next/link';
import Header from '@/components/header/header';

const contentCopy = [
  {
    heroLineOne: 'archive.applaud.',
    heroLineTwo: 'archive.',
    heroLineThree: 'applaud.',
    heroLine: 'applaudify.',
    text: 'Collect, manage, and showcase your professional testimonials - every applaud matters.',
    button: 'Get Started',
    href: '/login',
  },
  {
    subTitle: 'all your applauds in one place',
    title: 'applaud inbox',
    text: 'A dedicated space to receive and manage all your accolades. Choose which applauds highlight your profile.',
  },
  {
    subTitle: 'redefining your professional profile',
    title: 'dynamic profile',
    text: 'Beyond a typical CV—showcase your journey, skills, and experiences, validated by the applause you&apos;ve earned.',
  },
  {
    subTitle: 'celebrate achievements together',
    title: 'social feed',
    text: 'Engage with the community. Revel in shared successes and accolades. Don&apos;t forget to showcase your achievements!',
  },
];

const Landing = () => {
  return (
    <div className='page-layout'>
      <Header />
      <div>
        {contentCopy.map((copy, index) => {
          return (
            <div key={index + copy.text}>
              <div className='hero-title'>
                {copy.heroLineTwo}
                <br />
                {copy.heroLineThree}
                <br />
                {copy.heroLine}
              </div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          );
        })}
      </div>
      <footer>
        <p className='info-3'>© 2023-2024 applaudify</p>
      </footer>
    </div>
  );
};

export default Landing;
