import { Button, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import AccountMenu from './accountMenu';

export default function Navbar({ isOnLogin = false }) {
  const router = useRouter();
  const userInfoState = useSelector(state => state.userReducer.userInfo);

  const handleNavigateToSignup = () => {
    router.push('/signup');
  };
  return (
    <nav className={styles.sticky} >
      <Flex
        paddingX={12}
        paddingY={6}
        background='whiteAlpha.600'
        justifyContent='space-between'
        borderBottom='1px solid #ccc'
        alignItems='center'
      >
        <Flex gap={12} justifyContent='center'>
          <Link href='/' >
            <Image src='/img/hondu-chamba-logo.png' width={100} height={40} alt='logo-hondu-freelance' />
          </Link>
          {!isOnLogin && (<>
            <Link href='/' passHref legacyBehavior>
              <a className={router?.pathname === '/' ? styles['active'] : styles['navbar-link']}>Inicio</a>
            </Link>
            <Link href='/findTalent' passHref legacyBehavior>
              <a className={router?.pathname === '/findTalent' ? styles['active'] : styles['navbar-link']}>Encontrar Talento</a>
            </Link>
            <Link href='/findWork' passHref legacyBehavior>
              <a className={router?.pathname === '/findWork' ? styles['active'] : styles['navbar-link']}>Encontrar Trabajo</a>
            </Link>
          </>)}
        </Flex>

        <Flex gap={12} alignItems='center'>
          { !userInfoState?.token && (<Link href='/login' passHref legacyBehavior>
            <a className={router?.pathname === '/login' ? styles['active'] : styles['navbar-link']}>Log In</a>
          </Link>)}
          {!isOnLogin && !userInfoState?.token && (<Button colorScheme='teal' size='lg' paddingY={8} borderRadius={12} onClick={handleNavigateToSignup} >
            <Text fontSize={15} fontWeight={700}>
              Sign Up
            </Text>
          </Button>)}
          {userInfoState?.token && (
            <AccountMenu userInfo={userInfoState} />
          )}
        </Flex>
      </Flex>
    </nav>
  );
}
