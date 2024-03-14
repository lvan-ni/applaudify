import React from 'react';
import Link from 'next/link';
import Header from '@/components/header/header';

const Landing = async () => {
  return (
    <div className='page-layout'>
      <Header />
      <section>
        <div className='title-4 tabletP:title-3 tabletL:title-1'>
          <h1>archive.</h1>
          <h1>applaud.</h1>
          <h1>applaudify.</h1>
        </div>
        <p className=''>
          Collect, manage, and showcase your professional testimonials - every
          applaud matters.
        </p>
        <Link
          href='/login'
          className=''
        >
          Get Started
        </Link>
      </section>
      <section>
        <h5 className=''>all your applauds in one place</h5>
        <h1>applauds inbox</h1>
        <p>
          A dedicated space to receive and manage all your accolades. Choose
          which applauds highlight your profile.
        </p>
        <Link
          href='/login'
          className=''
        >
          Get Started
        </Link>
      </section>
      <section>
        <h5 className=''>redefining your professional profile</h5>
        <h1>dynamic profile</h1>
        <p>
          Beyond a typical CV—showcase your journey, skills, and experiences,
          validated by the applause you&apos;ve earned.
        </p>
        <Link
          href='/login'
          className=''
        >
          Get Started
        </Link>
      </section>
      <section>
        <h5 className=''>celebrate achievements together</h5>
        <h1>social feed</h1>
        <p>
          Engage with the community. Revel in shared successes and accolades.
          Don&apos;t forget to showcase your achievements!
        </p>
        <Link
          href='/login'
          className=''
        >
          Get Started
        </Link>
      </section>

      <footer>
        <p className=''>© 2023-2024 applaudify</p>
      </footer>
    </div>
  );
};

export default Landing;
