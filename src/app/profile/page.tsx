'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Header from '@/components/header/header';
import InboxUnreadCount from '@/components/check/inbox-unread-count';
import ProfileInfo from '@/components/profile-info/profile-info';
import CardForProfile from '@/components/applaud-card/profile';
import MockAppluadCards from '@/components/applaud-card/mock';
import { getAllUsers } from '@/libs/users/user-actions';
import { getPublishedApplauds } from '@/libs/applauds/applaud-actions';
import { UserT } from '@/types/UserT';
import { ApplaudT } from '@/types/ApplaudT';

const Profile = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserT>();
  const [thisUserApplauds, setThisUserApplauds] = useState<ApplaudT[]>([]);

  const firstName = session?.user?.name?.split(' ')[0] as string;
  const imageURL = session?.user?.image as string;
  const email = session?.user?.email as string;

  useEffect(() => {
    (async () => {
      const applauds = (await getPublishedApplauds(email)) as ApplaudT[];
      const users = (await getAllUsers()) as UserT[];
      const currentUser = users.find((user) => user.email === email);
      setUser(currentUser);
      setThisUserApplauds(applauds);
    })();
  }, [email]);

  const bio = user?.bio as string;
  const skills = user?.skills?.split(',') as string[];
  const experience = user?.experience as string;

  return (
    <div className='flex flex-col mt-4 gap-10'>
      <Header />
      <main className='flex flex-col items-center gap-10 mx-10'>
        <section className='flex flex-col gap-8 items-center w-full'>
          <div className='flex w-full flex-col gap-3'>
            <div className='flex items-center justify-end gap-4 '>
              <Link
                href='/profile/edit'
                className='header-nav'
              >
                Edit
              </Link>
              <div className='flex justify-end'>
                {session && <InboxUnreadCount session={session} />}
              </div>
            </div>
            <div className='flex items-center justify-center w-full gap-8 px-2 py-3'>
              {session && (
                <Image
                  src={imageURL}
                  alt='Profile photo'
                  width={88}
                  height={88}
                  className='rounded-full border border-silver'
                ></Image>
              )}
              <div className='w-3/5'>
                <h4 className='body-large'>{user?.name}</h4>
                <p className='body-small'>{user?.jobTitle}</p>
                <p className='body-small'>{user?.company}</p>
              </div>
            </div>
          </div>
          <ProfileInfo
            bio={bio}
            skills={skills}
            experience={experience}
          />
        </section>
        <h3 className='sub-title'>{firstName}&apos;s applauds</h3>
        <section className='flex flex-col w-full'>
          <CardForProfile applauds={thisUserApplauds} />
          <MockAppluadCards firstName={firstName} />
        </section>
      </main>
    </div>
  );
};

export default Profile;
