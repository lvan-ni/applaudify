'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUnreadApplauds } from '@/libs/applauds/applaud-actions';
import { SessionT } from '@/types/SessionT';
import { ApplaudT } from '@/types/ApplaudT';

type InboxProps = {
  session: SessionT;
};

const InboxUnreadCount = ({ session }: InboxProps) => {
  const [Numbers, setNumbers] = useState<string>('');

  useEffect(() => {
    (async () => {
      const email = session?.user?.email as string;
      if (email) {
        const unreadApplauds = (await getUnreadApplauds(email)) as ApplaudT[];
        const unreadNumbers = unreadApplauds.length;
        if (unreadNumbers !== 0) {
          const convertToString = unreadNumbers.toString();
          setNumbers(convertToString);
        }
      }
    })();
  }, [session]);

  return (
    <Link
      href='/inbox'
      className='flex gap-2 items-center header-nav header-btn'
    >
      Inbox
      {Numbers !== '' && (
        <div className='counter-border'>
          <div className='counter small'>{Numbers}</div>
        </div>
      )}
    </Link>
  );
};

export default InboxUnreadCount;
