import Header from '@/components/Header/Header';
import UserCheck from '@/components/login-user-check/user-check';
import CardForHome from '@/components/plaud-card/home';
import { getAllUsers } from '@/libs/users/user-actions';
import { UserT } from '@/types/UserT';

const Home = async () => {
  const allUsers = (await getAllUsers()) as UserT[];
  return (
    <div className='flex flex-col gap-10 mt-4'>
      <Header />
      <UserCheck allUsers={allUsers} />
      <main className='flex flex-col gap-8 mt-1 mx-10'>
        <h1 className='small-header'>👏 Spotlights</h1>
        <CardForHome />
      </main>
    </div>
  );
};

export default Home;
