import Header from '@/components/header/header';
import UserCheck from '@/components/check/user-check';
import PlaudCardHome from '@/components/applaud-card/home';

const Home = async () => {
  return (
    <div className='page-layout'>
      <Header />
      <UserCheck />
      <main className='flex flex-col gap-8 mt-1 mx-10'>
        <h1 className='title'>Discover</h1>
        <PlaudCardHome />
      </main>
    </div>
  );
};

export default Home;
