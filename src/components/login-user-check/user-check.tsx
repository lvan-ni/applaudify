'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { addNewUser } from '@/libs/users/user-actions';
import { UserT } from '@/types/UserT';

type UserCheckProps = {
  allUsers: UserT[];
};

const UserCheck = ({ allUsers }: UserCheckProps) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    const CheckAndAddUser = async () => {
      const isUserNew = !allUsers.some(
        (member: UserT) => member.email === session.user?.email
      );
      if (isUserNew) {
        await addNewUser({
          email: session.user?.email as string,
          name: session.user?.name as string,
          avatarURL: session.user?.image as string,
        });
      }
    };
    CheckAndAddUser();
  }, [session, allUsers]);

  return null;
};

export default UserCheck;
