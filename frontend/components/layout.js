import Head from 'next/head';
import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import { useSelector } from 'react-redux';
import CommandBar from './commandBar';
import io from 'socket.io-client';
import Chat from './chat';

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
