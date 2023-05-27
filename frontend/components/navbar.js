import { Button, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Navbar({ isOnLogin = false }) {
  const { pathname } = useRouter();
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
              <a className={pathname === '/' ? styles['active'] : styles['navbar-link']}>Inicio</a>
            </Link>
            <Link href='/findTalent' passHref legacyBehavior>
              <a className={pathname === '/findTalent' ? styles['active'] : styles['navbar-link']}>Encontrar Talento</a>
            </Link>
            <Link href={'/findWork'} passHref legacyBehavior>
              <a className={pathname === '/findWork' ? styles['active'] : styles['navbar-link']}>Encontrar Trabajo</a>
            </Link>
          </>)}
        </Flex>

        <Flex gap={12} alignItems='center'>
          <Link href='/login' passHref legacyBehavior>
            <a className={pathname === '/login' ? styles['active'] : styles['navbar-link']}>Log In</a>
          </Link>
          { !isOnLogin && (<Button colorScheme='teal' size='lg' paddingY={8} borderRadius={12}>
            <Text fontSize={15} fontWeight={700}>
              Sign Up
            </Text>
          </Button>)}
        </Flex>
      </Flex>
    </nav>
  );
}
