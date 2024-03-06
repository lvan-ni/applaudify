'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { initialTabs as tabs } from '@/types/Tabs';
import Header from '@/components/header/header';
import Inbox from '@/components/inbox/inbox';
import CardForProfile from '@/components/applaud-card/profile';
import MockAppluadCards from '@/components/applaud-card/mock';
import { getAllUsers } from '@/libs/users/user-actions';
import { getPublishedApplauds } from '@/libs/applauds/applaud-actions';
import { UserT } from '@/types/UserT';
import { ApplaudT } from '@/types/ApplaudT';

const Profile = () => {
  const [user, setUser] = useState<UserT>();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [activeTab, setActiveTab] = useState('Bio');
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [individualApplauds, setIndividualApplauds] = useState<ApplaudT[]>([]);
  const { data: session } = useSession();

  const firstName = session?.user?.name?.split(' ')[0] as string;
  const imageURL = session?.user?.image as string;
  const email = session?.user?.email as string;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    (async () => {
      const applauds = (await getPublishedApplauds(email)) as ApplaudT[];
      const users = (await getAllUsers()) as UserT[];
      const currentUser = users.find((user) => user.email === email);
      setUser(currentUser);
      setIndividualApplauds(applauds);
      if (currentUser?.skills) {
        setUserSkills(currentUser.skills.split(','));
      }
    })();
  }, [email]);

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
                {session && <Inbox session={session} />}
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
          <nav className='flex justify-around w-full'>
            {tabs.map((item) => (
              <button
                key={item.label}
                className={`${
                  item === selectedTab
                    ? 'profile-button clicked'
                    : 'profile-button'
                } w-24 p-2 border border-silver/50 rounded-3xl body-small`}
                onClick={() => {
                  handleTabClick(item.label);
                  setSelectedTab(item);
                }}
              >
                {`${item.label}`}
                {item === selectedTab ? (
                  <motion.div
                    className='underline'
                    layoutId='underline'
                  />
                ) : null}
              </button>
            ))}
          </nav>
          <div>
            <AnimatePresence mode='wait'>
              <motion.div
                key={selectedTab ? selectedTab.label : 'empty'}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'Bio' && (
                  <section className='flex flex-col'>
                    <p>{user?.bio}</p>
                  </section>
                )}
                {activeTab === 'Skills' && (
                  <section className='flex flex-wrap gap-2 justify-center'>
                    {userSkills.map((skill, index) => (
                      <div
                        key={index}
                        className='skill-btn'
                      >
                        {skill}
                      </div>
                    ))}
                  </section>
                )}
                {activeTab === 'Experience' && (
                  <section
                    className='flex flex-col gap-3'
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {user?.experience}
                  </section>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
        <h3 className='sub-title'>{firstName}&apos;s applauds</h3>
        <section className='flex flex-col w-full'>
          <CardForProfile applauds={individualApplauds} />
          <MockAppluadCards
            firstName={firstName}
            imageURL={imageURL}
          />
        </section>
      </main>
    </div>
  );
};

export default Profile;
