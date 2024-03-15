'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/nav/logo-large.png';
import menuSmall from '@/assets/nav/menu-small.png';
import menuLarge from '@/assets/nav/menu-large.png';
import closeSmall from '@/assets/nav/close-small.png';
import closeLarge from '@/assets/nav/close-large.png';

const Header = () => {
  const { data: session } = useSession();
  const [dropDown, setDropDown] = useState(false);
  const toggleMenu = () => {
    setDropDown(!dropDown);
  };

  const navLinks = [
    {
      text: session ? 'Profile' : '',
      href: '/profile',
      className: 'tabletP:hidden',
    },
    {
      text: session ? 'Inbox' : '',
      href: '/inbox',
      className: 'tabletP:hidden',
    },
    {
      text: 'About',
      href: '/about',
      className: '',
    },
    {
      text: session ? 'Learn' : '',
      href: '/landing',
      className: '',
    },
    {
      text: 'GitHub',
      href: 'https://github.com/lvan-ni/applaudify',
      target: '_blank',
      rel: 'noopener noreferrer',
      className: '',
    },
  ];

  const menuVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  const menuItemsContainerVariants = {
    initial: {
      transition: {
        staggerChildren: 0.45,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.15,
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };

  const menuItemVariants = {
    initial: {
      y: '30vh',
      transition: {
        duration: 0.25,
        ease: [0.37, 0, 0.63, 1],
      },
    },
    open: {
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0, 0.55, 0.45, 1],
      },
    },
  };

  return (
    <header className='sticky top-0 flex flex-col py-2.5 gap-3 z-10 w-full justify-between items-center bg-day'>
      <div className='flex w-full items-center justify-between gap-5 tabletP:gap-10 menu-nav'>
        <Link href='/'>
          <Image
            src={logo}
            alt='logo'
            height={22}
            className='laptopL:hidden'
          ></Image>
          <Image
            src={logo}
            alt='logo'
            height={30}
            className='hidden laptopL:block'
          ></Image>
        </Link>
        <div className='tabletL:hidden'>
          <AnimatePresence>
            {dropDown && (
              <motion.div
                variants={menuVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                className='drop-menu-layout'
              >
                <div className='flex h-full flex-col'>
                  <div className='flex justify-between items-center py-2.5'>
                    <Link href='/'>
                      <Image
                        src={logo}
                        alt='logo'
                        height={20}
                        className='tabletP:hidden'
                      ></Image>
                      <Image
                        src={logo}
                        alt='logo'
                        height={30}
                        className='phoneSEP:hidden tabletP:block'
                      ></Image>
                    </Link>
                    <Image
                      src={closeSmall}
                      alt='close menu'
                      height={34}
                      onClick={toggleMenu}
                      className='tabletP:hidden'
                    ></Image>
                    <Image
                      src={closeLarge}
                      alt='close menu'
                      height={42}
                      onClick={toggleMenu}
                      className='phoneSEP:hidden tabletP:block'
                    ></Image>
                  </div>
                  <motion.div
                    variants={menuItemsContainerVariants}
                    initial='initial'
                    animate='open'
                    exit='initial'
                    className='drop-menu-inner-layout'
                  >
                    <div className='navlink-container'>
                      {navLinks.map((link, index) => {
                        return (
                          <div
                            className='overflow-hidden'
                            key={index + link.text}
                          >
                            <motion.div
                              variants={menuItemVariants}
                              initial='initial'
                              animate='open'
                              exit='initial'
                            >
                              <Link
                                href={link.href}
                                rel={link.rel}
                                target={link.target}
                                className={`${link.className} menu-nav`}
                              >
                                {link.text}
                              </Link>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                    {session ? (
                      <div className='logout-container'>
                        <hr className='h-1 bg-sunrise' />
                        <button
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className='menu-nav underline hover:underline-offset-8 flex self-start'
                        >
                          Log out
                        </button>
                      </div>
                    ) : null}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className='menu-nav-container'>
          {session ? (
            <>
              <Link
                href='/profile'
                className='hidden tabletP:block'
              >
                Profile
              </Link>
              <Link
                href='/inbox'
                className='hidden tabletP:block'
              >
                Inbox
              </Link>
              <Link
                href='/about'
                className='hidden tabletL:block'
              >
                About
              </Link>
              <Link
                href='/landing'
                className='hidden tabletL:block'
              >
                Learn
              </Link>
              <Link
                href='https://github.com/lvan-ni/applaudify'
                target='_blank'
                rel='noopener noreferrer'
                className='hidden tabletL:block'
              >
                GitHub
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className='hidden tabletL:block underline hover:underline-offset-8'
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              href='/login'
              className='menu-nav underline hover:underline-offset-8'
            >
              Login
            </Link>
          )}
          <Image
            src={menuSmall}
            alt='menu'
            width={34}
            onClick={toggleMenu}
            className='tabletP:hidden tabletL:hidden'
          ></Image>
          <Image
            src={menuLarge}
            alt='menu'
            width={42}
            onClick={toggleMenu}
            className='hidden tabletP:block tabletL:hidden'
          ></Image>
        </div>
      </div>
    </header>
  );
};

export default Header;
