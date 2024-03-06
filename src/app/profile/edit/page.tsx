'use client';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import BackButton from '@/components/button/back-button';
import { getAllUsers } from '@/libs/users/user-actions';
import { updateUserProfile } from '@/libs/users/user-actions';
import { UserT } from '@/types/UserT';
import { NewProfileInfoT } from '@/types/newProfileInfoT';

const EditProfile = () => {
  const { data: session } = useSession();

  const [user, setUser] = useState<UserT>();
  const [userName, setUserName] = useState('');
  const [userJobTitle, setUserJobTitle] = useState('');
  const [userCompany, setUserCompany] = useState('');
  const [userBio, setUserBio] = useState('');
  const [userExperience, setUserExperience] = useState('');
  const [userSkills, setUserSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState<string>('');
  const [skillsErrorMessage, setSkillsErrorMessage] = useState<string>('');
  const [nameErrorMessage, setNameErrorMessage] = useState<string>('');

  const formRef = useRef<HTMLFormElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const newSkillRef = useRef<HTMLInputElement>(null);
  const experienceRef = useRef<HTMLTextAreaElement>(null);
  const imageURL = session?.user?.image as string;
  const userEmail = session?.user?.email as string;

  useEffect(() => {
    if (!session) {
      return;
    }
    (async () => {
      const users = (await getAllUsers()) as UserT[];
      const currentUser = users.find((user) => user.email === userEmail);
      setUser(currentUser);
      setUserName(currentUser?.name as string);
      setUserJobTitle(currentUser?.jobTitle as string);
      setUserCompany(currentUser?.company as string);
      setUserBio(currentUser?.bio as string);
      setUserExperience(currentUser?.experience as string);
      if (currentUser?.skills) {
        setUserSkills(currentUser.skills.split(','));
      }
    })();
  }, [session, userEmail]);

  const handleRemoveSkill = (indexToRemove: number) => {
    const updatedSkills = [...userSkills];
    updatedSkills.splice(indexToRemove, 1);
    setUserSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    const newSkill = newSkillRef.current?.value.trim();
    if (!newSkill) {
      setNewSkill('');
      return;
    }
    if (
      !userSkills.find(
        (skill) => skill.toLowerCase() === newSkill.toLowerCase()
      )
    ) {
      setUserSkills([...userSkills, newSkill]);
      setNewSkill('');
    } else {
      setSkillsErrorMessage('That skill is already added.');
      setTimeout(() => {
        setSkillsErrorMessage('');
      }, 5000);
    }
  };

  const handleSkillChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewSkill(e.target.value);
  };

  const handleBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setUserBio(e.target.value);
  };

  const handleExperienceChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setUserExperience(e.target.value);
  };

  const handleSave = () => {
    if (userName.trim() === '') {
      setNameErrorMessage('Name cannot be empty.');
      setTimeout(() => {
        setNameErrorMessage('');
      }, 5000);
      return;
    }
    const userSkillsString = userSkills.join(',');
    const userBio = bioRef.current?.value;
    const userExperience = experienceRef.current?.value;
    const userId = user?.userId as string;

    const newProfileInfo: NewProfileInfoT = {
      name: userName,
      jobTitle: userJobTitle,
      company: userCompany,
      bio: userBio,
      skills: userSkillsString,
      experience: userExperience,
    };

    updateUserProfile(newProfileInfo, userId);

    setTimeout(() => {
      window.location.href = '/profile';
    }, 500);
  };

  return (
    <div className='flex flex-col mx-10 mt-14 gap-10'>
      <header className='flex justify-between items-center'>
        <BackButton />
        <button
          className='header-nav'
          onClick={handleSave}
        >
          Save
        </button>
      </header>

      <section className='flex flex-col gap-8 items-center w-full pb-24'>
        <div className='flex w-full flex-col gap-8'>
          <div className='flex items-center justify-center w-full gap-8 px-2 py-3'>
            {session && (
              <Image
                src={imageURL}
                alt='Profile photo'
                width={88}
                height={88}
                className='rounded-full border border-silver'
              ></Image>
            )}
            <div className='flex flex-col gap-2'>
              <input
                type='text'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className='body-large bg-white text-charcoal border border-silver rounded-xl p-2 w-full'
                placeholder='Name'
              />
              {nameErrorMessage}
              <input
                type='text'
                value={userJobTitle}
                onChange={(e) => setUserJobTitle(e.target.value)}
                className='body-small bg-white text-charcoal border border-silver rounded-xl p-2 w-full'
                placeholder='Job Title'
              />
              <input
                type='text'
                value={userCompany}
                onChange={(e) => setUserCompany(e.target.value)}
                className='body-small bg-white text-charcoal border border-silver rounded-xl p-2 w-full'
                placeholder='Company'
              />
            </div>
          </div>
          <form
            id='editProfile'
            className='flex flex-col gap-10'
            ref={formRef}
          >
            <textarea
              rows={6}
              placeholder='Bio'
              ref={bioRef}
              value={userBio}
              onChange={handleBioChange}
              className='border border-silver rounded-xl p-3'
              maxLength={1000}
            />
          </form>
          <div className='flex flex-col justify-center items-center gap-4'>
            <div className='flex gap-2 justify-center flex-wrap'>
              {userSkills.map((skill, index) => (
                <div
                  key={index}
                  className='skill-btn'
                >
                  <button onClick={() => handleRemoveSkill(index)}>
                    {skill} x
                  </button>
                </div>
              ))}
            </div>
            {skillsErrorMessage}
            <div className='flex gap-2 justify-center'>
              <input
                type='text'
                placeholder='New Skill..'
                ref={newSkillRef}
                value={newSkill}
                onChange={handleSkillChange}
                className='w-1/2 border border-silver rounded-xl px-3'
              />
              <button
                className='btn w-1/3'
                onClick={handleAddSkill}
              >
                Add
              </button>
            </div>
          </div>
          <textarea
            rows={10}
            placeholder='Experience'
            ref={experienceRef}
            value={userExperience}
            onChange={handleExperienceChange}
            className='border border-silver rounded-xl p-3'
            maxLength={1000}
          />
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
