'use client';
import React from 'react';
import { unpublishApplaud } from '@/libs/applauds/applaud-actions';
import { useRouter } from 'next/navigation';

type PublishButtonProps = {
  slug: string;
};

const UnpublishButton: React.FC<PublishButtonProps> = ({ slug }) => {
  const router = useRouter();
  const handlePublishClick = () => {
    unpublishApplaud(slug);
    setTimeout(() => {
      router.refresh();
      window.location.reload();
    }, 300);
  };
  return (
    <button
      className='btn mt-10'
      onClick={handlePublishClick}
    >
      Unpublish
    </button>
  );
};

export default UnpublishButton;
