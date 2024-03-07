'use client';
import React from 'react';
import Header from '@/components/header/header';
import Image from 'next/image';
import Link from 'next/link';
import ilija from '@/assets/about/ilija.png';
import lvan from '@/assets/about/lvan.png';

const About = () => {
  return (
    <div className='flex flex-col items-center mb-10 mt-4'>
      <Header />
      <main className='flex flex-col gap-20 mt-20 mx-10'>
        <section className='flex flex-col items-center gap-10'>
          <h3 className='sub-title'>About Us</h3>
          <p className='body-small'>
            At Apapplaudify, we understand that for freelancers and consultants,
            every project is a testament to their adaptability, creativity, and
            commitment. Hence, our platform doesn&apos;t just stop at collecting
            affirmations; it transforms them into a dynamic journey. This not
            only serves as a source of personal motivation but also as a
            showcase for potential clients, demonstrating the value and impact
            these professionals bring to the table.
          </p>
        </section>
        <section className='flex flex-col items-center gap-10'>
          <h3 className='sub-title'>Our Team</h3>
          <p className='body-small'>
            Behind Apapplaudify is a team of dedicated individuals, each
            bringing a unique set of skills and experiences to the table:
          </p>
        </section>
        <section className='grid grid-cols-2 gap-10'>
          <Link href='https://www.linkedin.com/in/lvan-ni/'>
            <article className='flex flex-col items-center'>
              <Image
                src={lvan}
                alt='Lvan Photo'
                width={100}
              ></Image>
              <h4>Lvan Ni</h4>
              <p className='body-small'>Frontend, Architect</p>
            </article>
          </Link>
          <Link href='https://www.linkedin.com/in/ilijakrilovic/'>
            <article className='flex flex-col items-center'>
              <Image
                src={ilija}
                alt='ilija Photo'
                width={100}
              ></Image>
              <h4>Ilija Krilovic</h4>
              <p className='body-small'>Backend, DevOps</p>
            </article>
          </Link>
        </section>
      </main>
      <footer className='flex flex-col gap-10 mt-20 mx-10'>
        <p className='small text-center text-stone mt-20'>
          © 2023 Apapplaudify
        </p>
      </footer>
    </div>
  );
};

export default About;
