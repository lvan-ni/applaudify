'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import BackButton from '@/components/button/back-button';
import {
  getAllApplauds,
  setApplaudToRead,
} from '@/libs/applauds/applaud-actions';
import { ApplaudT } from '@/types/ApplaudT';

const Inbox = () => {
  const [filteredApplauds, setFilteredApplauds] = useState<ApplaudT[]>([]);
  const { data: session } = useSession();

  const firstName = session?.user?.name?.split(' ')[0];
  const fullName = session?.user?.name;

  useEffect(() => {
    (async () => {
      const applauds = (await getAllApplauds()) as ApplaudT[];
      const filteredApplauds = applauds.filter(
        (applaud) => applaud.receiver.name === fullName
      );
      setFilteredApplauds(filteredApplauds);
    })();
  }, [fullName]);

  return (
    <div className='flex flex-col mx-10 mt-14 gap-10'>
      <header className='flex justify-between items-center'>
        <BackButton />
        <Link
          className='header-nav'
          href='/compose'
        >
          New
        </Link>
      </header>
      <main className='flex flex-col items-center'>
        <section className='flex flex-col gap-7 w-full'>
          {filteredApplauds.map((applaud) => {
            const firstName = applaud.sender.name.split(' ')[0];
            const commentPreview = applaud.applaudContent
              .split(' ')
              .slice(0, 5)
              .join(' ');
            const date = new Date(applaud.createdAt);
            const dateString = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
            const weekdayString = date.toLocaleDateString('en-US', {
              weekday: 'short',
            });
            return (
              applaud && (
                <article
                  className='flex flex-col px-5 py-3 gap-2 border border-silver rounded-3xl w-full bg-white'
                  key={applaud.applaudId}
                >
                  <Link
                    href={`inbox/${applaud.applaudId}`}
                    onClick={() =>
                      setApplaudToRead(applaud.applaudId as string)
                    }
                  >
                    <div className='flex justify-between w-full items-center'>
                      <div className='flex items-center justify-center gap-5'>
                        {!applaud.isRead && (
                          <h4 className='button text-blue'>•</h4>
                        )}
                        {<h4 className='button font-bold'>{firstName}</h4>}
                      </div>
                      <p className='small text-stone'>
                        {weekdayString}, {dateString}
                      </p>
                    </div>
                    <p className='body-small pt-1 text-stone'>
                      {commentPreview}...
                    </p>
                  </Link>
                </article>
              )
            );
          })}
          <article className='flex flex-col px-5 py-3 gap-2 border border-silver rounded-3xl w-full bg-white'>
            <Link href={'/inbox/hugo'}>
              <div className='flex justify-between items-center'>
                <h4 className='button font-bold'>Hugo</h4>
                <p className='small text-stone'>Thu, Oct 19, 2023</p>
              </div>
              <p className='body-small pt-1 text-stone'>
                {firstName} is a great developer! ...
              </p>
            </Link>
          </article>
          <article className='flex flex-col px-5 py-3 gap-2 border border-silver rounded-3xl w-full bg-white'>
            <Link href={'/inbox/vanessa'}>
              <div className='flex justify-between items-center'>
                <h4 className='button font-bold'>Vanessa</h4>
                <p className='small text-stone'>Mon, Oct 2, 2023</p>
              </div>
              <p className='body-small pt-1 text-stone'>
                {firstName} is a talented and ...
              </p>
            </Link>
          </article>
          <article className='flex flex-col px-5 py-3 gap-2 border border-silver rounded-3xl w-full bg-white'>
            <Link href={'/inbox/ahsan'}>
              <div className='flex justify-between items-center'>
                <h4 className='button font-bold'>Ahsan</h4>
                <p className='small text-stone'>Wed, Sep 6, 2023</p>
              </div>
              <p className='body-small pt-1 text-stone'>
                Working along side {firstName} on ...
              </p>
            </Link>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Inbox;
