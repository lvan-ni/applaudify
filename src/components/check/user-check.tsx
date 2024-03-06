'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { checkAndAddUser } from '@/libs/users/user-actions';
import { NewUserT } from '@/types/NewUserT';

const UserCheck = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    
    const CheckAndAddUser = async () => {
      const thisUserData: NewUserT = {
        email: session.user?.email as string,
        name: session.user?.name as string,
        avatarURL: session.user?.image as string,
      };
      await checkAndAddUser(thisUserData);
    };
    CheckAndAddUser();
  }, [session]);

  return null;
};

export default UserCheck;