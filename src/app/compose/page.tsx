'use client';
import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
} from 'react';
import { useSession } from 'next-auth/react';
import { getAllUsers } from '@/libs/users/user-actions';
import { sendNewApplaud } from '@/libs/applauds/applaud-actions';
import { UserT } from '@/types/UserT';
import { NewApplaudT } from '@/types/NewApplaudT';
import BackButton from '@/components/button/back-button';

const Compose = () => {
  const { data: session } = useSession();

  const [users, setUsers] = useState<UserT[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserT[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [applaudText, setApplaudText] = useState<string>(
    'Start a applaud here...'
  );
  const [errorMessage, setErrorMessage] = useState<string>('');

  const commentRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const currentEmail = session?.user?.email;
  const currentUser = users.find((user: UserT) => user.email === currentEmail);
  const currentUserId = currentUser?.userId as string;
  const receiver = users.find((user: UserT) => user.name === searchValue);
  const receiverId = receiver?.userId as string;

  useEffect(() => {
    (async () => {
      const allUsers = (await getAllUsers()) as UserT[];
      setUsers(allUsers);
    })();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, users]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleUserSelect = (name: string) => {
    setSearchValue(name);
    setErrorMessage('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const applaudContent = commentRef.current?.value || '';

    if (!users.some((user) => user.name === searchValue)) {
      setErrorMessage('Please select the receiver');
      return;
    }
    if (!applaudContent || applaudContent.trim() === '') {
      setErrorMessage("Let's finish the Applaud before sending");
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return;
    }
    const newApplaud: NewApplaudT = {
      senderId: currentUserId,
      receiverId: receiverId,
      applaudContent: applaudContent,
    };

    sendNewApplaud(newApplaud);
    const form = formRef.current;
    form?.reset();

    setTimeout(() => {
      window.location.href = '/inbox/sent';
    }, 200);
  };

  const handleFocus = () => {
    setApplaudText('Start a applaud here...');
  };

  const handleBlur = () => {
    setApplaudText('Start a applaud here...');
  };

  return (
    <div className='flex flex-col mx-10 mt-14 gap-10'>
      <header className='flex justify-between items-center'>
        <BackButton />
        {searchValue && filteredUsers.length > 0 ? (
          <button
            className='header-nav'
            type='submit'
            form='sendApplaud'
            onClick={handleSubmit}
          >
            Send
          </button>
        ) : (
          <button
            className='header-nav text-silver'
            type='submit'
            form='sendApplaud'
            disabled
          >
            Send
          </button>
        )}
      </header>
      <form
        id='sendApplaud'
        className='flex flex-col gap-10'
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className='flex'>
          <p className='border-b border-silver'>To:</p>
          <input
            type='text'
            value={searchValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className='border-b border-silver w-full bg-transparent rounded-none'
          />
        </div>
        {searchValue &&
          filteredUsers.length > 0 &&
          (filteredUsers[0].name as string) !== (searchValue as string) && (
            <div>
              {filteredUsers.map((user: UserT) => (
                <div
                  key={user.userId}
                  onClick={() => handleUserSelect(user.name)}
                >
                  {user.name}
                </div>
              ))}
            </div>
          )}
        {searchValue && filteredUsers.length === 0 && <div>No User found</div>}
        {errorMessage}
        <textarea
          rows={10}
          placeholder={applaudText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={commentRef}
          className='border border-silver rounded-3xl p-3'
        />
      </form>
    </div>
  );
};

export default Compose;
