import Image from 'next/image';
import { ApplaudT } from '@/types/ApplaudT';
import Link from 'next/link';

type CardForProfileProps = {
  applauds: ApplaudT[];
};

const CardForProfile = ({ applauds }: CardForProfileProps) => {
  return (
    <div>
      {[...applauds]
        .filter((applaud) => applaud.isPublished === true)
        .map((applaud) => {
          const { sender, applaudContent, createdAt } = applaud;
          const date = new Date(createdAt);
          const dateString = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
          return (
            <section
              key={applauds.indexOf(applaud)}
              className='applaud-card'
            >
              <article className='flex flex-col items-center'>
                <p className='send-date'>{dateString}</p>
                <p className='p-2.5 body-main text-center'>
                  &apos;{applaudContent}&apos;
                </p>
              </article>
              <article className='flex flex-col items-center'>
                <p className='sender-info text-stone'>From</p>
                <Link href={`/user/${sender.userId}`}>
                  <div className='sender-layout'>
                    <Image
                      src={sender.avatarURL}
                      alt='Sender Profile'
                      width={30}
                      height={30}
                      className='profile-img'
                    ></Image>
                    <div className='flex w-full justify-between items-end'>
                      <div>
                        <h4 className='sender'>{sender.name}</h4>
                        <p className='sender-info'>{sender.jobTitle}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            </section>
          );
        })}
    </div>
  );
};

export default CardForProfile;
