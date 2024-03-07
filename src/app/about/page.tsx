'use client';
import React from 'react';
import Header from '@/components/header/header';
import Image from 'next/image';
import Link from 'next/link';
import ilija from '@/assets/about/ilija.png';
import lvan from '@/assets/about/lvan.png';
import tim from '@/assets/about/tim.png';
import sudha from '@/assets/about/sudha.png';

const About = () => {
  return (
    <div className='flex flex-col items-center mb-8 mt-4'>
      <Header />
      <main className='flex flex-col gap-20 mt-12 mx-10'>
        <section className='flex flex-col gap-6'>
          <h3 className='sub-title'>About Us</h3>
          <p className='body-main text-stone'>
            At Apapplaudify, we understand that for freelancers and consultants,
            every project is a testament to their adaptability, creativity, and
            commitment. Hence, our platform doesn&apos;t just stop at collecting
            affirmations; it transforms them into a dynamic journey. This not
            only serves as a source of personal motivation but also as a
            showcase for potential clients, demonstrating the value and impact
            these professionals bring to the table.
          </p>
        </section>
        <section className='flex flex-col gap-6'>
          <h3 className='sub-title'>Our Team</h3>
          <p className='body-main text-stone'>
            Behind Apapplaudify is a team of dedicated individuals, each
            bringing a unique set of skills and experiences to the table:
          </p>
          <div className='grid grid-cols-2 gap-10'>
            <Link href='https://www.linkedin.com/in/lvan-ni/'>
              <article className='flex flex-col items-center gap-2'>
                <Image
                  src={lvan}
                  alt='Lvan Photo'
                  width={100}
                ></Image>
                <div className='flex flex-col items-center'>
                  <h4>Lvan Ni</h4>
                  <p className='body-small text-center text-stone'>
                    Tech Lead, Frontend, Design
                  </p>
                </div>
              </article>
            </Link>
            <Link href='https://www.linkedin.com/in/ilijakrilovic/'>
              <article className='flex flex-col items-center gap-2'>
                <Image
                  src={ilija}
                  alt='ilija Photo'
                  width={100}
                ></Image>
                <div className='flex flex-col items-center'>
                  <h4>Ilija Krilovic</h4>
                  <p className='body-small text-center text-stone'>
                    Co-Creator, Backend, DevOps
                  </p>
                </div>
              </article>
            </Link>
            <Link href='https://www.linkedin.com/in/tim-hansson-meng/'>
              <article className='flex flex-col items-center gap-2'>
                <Image
                  src={tim}
                  alt='tim Photo'
                  width={100}
                ></Image>
                <div className='flex flex-col items-center'>
                  <h4 className='text-center'>Tim Hansson Meng</h4>
                  <p className='body-small text-stone'>Co-Creator</p>
                </div>
              </article>
            </Link>
            <Link href='https://www.linkedin.com/in/sudha-madhuri-poojari/'>
              <article className='flex flex-col items-center gap-2'>
                <Image
                  src={sudha}
                  alt='Suhda Photo'
                  width={100}
                ></Image>
                <div className='flex flex-col items-center'>
                  <h4 className='text-center'>Sudha Madhuri Poojari</h4>
                  <p className='body-small text-stone'>Co-Creator</p>
                </div>
              </article>
            </Link>
          </div>
        </section>
      </main>
      <footer className='flex flex-col gap-10 mt-6 mx-10'>
        <p className='small text-center text-stone mt-20'>
          © 2023-2024 Apapplaudify
        </p>
      </footer>
    </div>
  );
};

export default About;
