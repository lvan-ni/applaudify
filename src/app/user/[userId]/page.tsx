import Header from '@/components/header/header';
import ProfileInfo from '@/components/profile-info/profile-info';
import CardForProfile from '@/components/applaud-card/profile';
import MockAppluadCards from '@/components/applaud-card/mock';
import Image from 'next/image';
import { getAllUsers } from '@/libs/users/user-actions';
import { getPublishedApplauds } from '@/libs/applauds/applaud-actions';
import { ApplaudT } from '@/types/ApplaudT';


const userProfile = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const allUsers = await getAllUsers();
  const user = allUsers.find((user) => user.userId === userId);

  const email = user?.email as string;
  const fullName = user?.name as string;
  const firstName = user?.name.split(' ')[0] as string;
  const bio = user?.bio as string;
  const skills = user?.skills?.split(',') as string[];
  const experience = user?.experience as string;
  const individualApplauds = (await getPublishedApplauds(email)) as ApplaudT[];

  return (
    <div className='flex flex-col mt-4 gap-10'>
      <Header />
      <main className='flex flex-col items-center mx-10 gap-10'>
        <section className='flex flex-col gap-8 items-center w-full'>
          <div className='flex items-center justify-center w-full gap-8 px-2 py-3'>
            <Image
              src={user?.avatarURL!}
              alt='Profile photo'
              width={88}
              height={88}
              className='rounded-full border border-silver'
            ></Image>
            <div className='w-3/5'>
              <h4 className='body-large'>{fullName}</h4>
              <p className='body-small'>{user?.jobTitle}</p>
              <p className='body-small'>{user?.company}</p>
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
          <CardForProfile applauds={individualApplauds} />
          <MockAppluadCards
            firstName={firstName}
            imageURL={user?.avatarURL!}
          />
        </section>
      </main>
    </div>
  );
};

export default userProfile;
