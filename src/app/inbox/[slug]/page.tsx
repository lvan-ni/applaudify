import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllApplauds } from '@/libs/applauds/applaud-actions';
import { ApplaudT } from '@/types/ApplaudT';
import PublishButton from '@/components/button/publish-button';
import UnpublishButton from '@/components/button/unpublish-button';
import BackButton from '@/components/button/back-button';

const SingleApplaud = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const applauds = (await getAllApplauds()) as ApplaudT[];
  const filteredApplaud = applauds.filter(
    (applaud) => applaud.applaudId === slug
  );

  const { sender, applaudContent, isPublished, createdAt } = filteredApplaud[0];
  const date = new Date(createdAt);
  const dateString = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className='flex flex-col mx-10 mt-14 gap-10'>
      <header className='flex justify-between items-center'>
        <BackButton />
        <h4 className='body-main'>Applaud from {sender.name.split(' ')[0]}</h4>
        <div></div>
      </header>
      <main className='flex flex-col items-center mt-10'>
        <div className='applaud-card-container'>
          <section className='applaud-card-ombre'>
            <article className='flex flex-col items-center gap-2'>
              <p className='send-date-lg'>{dateString}</p>
              <p className='p-2.5 body-main text-center'>
                &apos;{applaudContent}&apos;
              </p>
            </article>
            <article className='flex flex-col items-center'>
              <p className='sender-info-lg text-stone'>From</p>
              <Link href={`/user/${sender.userId}`}>
                <div className='sender-layout-lg'>
                  <Image
                    src={sender.avatarURL}
                    alt='Sender Profile'
                    width={50}
                    height={50}
                    className='rounded-full'
                  ></Image>
                  <div className='flex w-full justify-between items-end'>
                    <div>
                      <h4 className='sender-lg'>{sender.name}</h4>
                      <p className='sender-info-lg'>{sender.jobTitle}</p>
                      <p className='sender-info-lg'>{sender.company}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          </section>
        </div>
        {isPublished ? (
          <div className='flex flex-col items-center w-full mt-5'>
            <p className='body-small mt-5 text-silver'>Applaud is published!</p>
            <UnpublishButton slug={slug} />
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center w-full'>
            <PublishButton slug={slug} />
          </div>
        )}
      </main>
    </div>
  );
};

export default SingleApplaud;
