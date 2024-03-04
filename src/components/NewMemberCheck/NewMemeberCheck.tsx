'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
// import { getAllUsers, addNewUser } from '@/libs/DB';
import { getAllUsers, addNewUser } from '@/libs/users/user-actions';
// import { UserT } from '@/types/UserT';

interface NewUserCheckProps {
  setUsers: (users: any) => void;
}

const NewUserCheck = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!session) return;
    let hasUser = true;

    (async () => {
      const users = await getAllUsers();
      if (hasUser) {
        users && setUsers(users);
        const isUserNew = !users.some(
          (member: UserT) => member.email === session.user?.email
        );
        if (isUserNew) {
          await addNewUser({
            email: session.user?.email as string,
            name: session.user?.name as string,
            avatarUrl: session.user?.image as string,
          });
        }
      }
    })();

    return () => {
      hasUser = false;
    };
  }, [session, setUsers]);

  return null;
};

export default NewUserCheck;
