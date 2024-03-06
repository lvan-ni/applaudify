import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllApplauds } from '@/libs/applauds/applaud-actions';

const PlaudCardHome = async () => {
  const allApplauds = await getAllApplauds();

  return (
    <div>
      {allApplauds &&
        [...allApplauds]
          .filter((applaud) => applaud.isPublished === true)
          .map((applaud) => {
            const { sender, receiver, applaudContent, createdAt } = applaud;
            const date = new Date(createdAt);
            const dateString = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
            return (
              <section
                key={allApplauds.indexOf(applaud)}
                className='applaud-card'
              >
                <Link href={`/user/${receiver.userId}`}>
                  <article className='receiver-layout'>
                    <Image
                      src={receiver.avatarURL && receiver.avatarURL}
                      alt='Receiver Profile'
                      width={60}
                      height={60}
                      className='profile-img'
                    ></Image>
                    <div>
                      <h4 className='receiver-name text-center'>
                        {receiver.name}
                      </h4>
                      <p className='receiver-info text-center'>
                        {receiver.jobTitle}
                      </p>
                      <p className='receiver-info text-center'>
                        {receiver.company}
                      </p>
                    </div>
                  </article>
                </Link>
                <p className='send-date'>{dateString}</p>
                <p className='p-2.5 body-main text-center'>
                  &apos;{applaudContent}&apos;
                </p>
                <article className='flex flex-col items-center'>
                  <p className='sender-info text-stone'>From</p>
                  <Link href={`/user/${sender.userId}`}>
                    <div className='sender-layout'>
                      <Image
                        src={sender.avatarURL}
                        alt='Sender Profile'
                        width={30}
                        height={30}
                        className='profile-img'
                      ></Image>
                      <div className='flex w-full justify-between items-end'>
                        <div>
                          <h4 className='sender'>{sender.name}</h4>
                          <p className='sender-info'>{sender.jobTitle}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              </section>
            );
          })}
    </div>
  );
};

export default PlaudCardHome;
