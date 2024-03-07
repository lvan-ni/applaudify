import Header from '@/components/header new/header';
import UserCheck from '@/components/check/user-check';
import PlaudCardHome from '@/components/applaud-card/home';

const Home = async () => {
  return (
    <div className='flex flex-col gap-10 mt-4'>
      <Header />
      <UserCheck />
      <main className='flex flex-col gap-8 mt-1 mx-10'>
        <h1 className='small-header'>👏 Spotlights</h1>
        <PlaudCardHome />
      </main>
    </div>
  );
};

export default Home;
