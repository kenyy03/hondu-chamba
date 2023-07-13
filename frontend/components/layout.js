import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { useSelector } from 'react-redux';
import CommandBar from './commandBar';
import io from 'socket.io-client';
import Chat from './chat';
import { useRouter } from 'next/router';
import Loading from './loading';

const socket = io('http://localhost:3010');

export default function Layout({
  children,
  title = '',
  description = '',
  isOnLogin = false,
  onShowModal = () => {},
  onCloseModal = () => {},
  onRenderContentModal = () => {},
  showModal = false,
}) {
  const userInfoState = useSelector(state => state.userReducer.userInfo);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleLinkClick = () => {
      setIsLoading(true);
    }
  
    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    } 
  
    router.events.on('routeChangeStart', handleLinkClick);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
  
    return () => {
      router.events.off('routeChangeStart', handleLinkClick);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  
    }, []);

    if (isLoading) {
      return <Loading open={isLoading} />
    }

  return (
    <>
      <Head>
        <title>HonduFreelance - {title}</title>
        <meta name='description' content={description} />
      </Head>
      <Navbar isOnLogin={isOnLogin} />
      {userInfoState?.role?.name === 'Recruiter' && (
        <CommandBar
          onShowModal={onShowModal}
          onCloseModal={onCloseModal}
          showModal={showModal}
          onRenderContentModal={onRenderContentModal}
        />
      )}
      <>{children}</>
      {(userInfoState?.token ) && (
          <Chat
            socket={socket}
            userInfo={userInfoState}
          />
        )}
      <Footer />
    </>
  );
}
