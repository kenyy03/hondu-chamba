import { Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import styles from '../styles/Footer.module.css'

export default function Footer() {
  const { pathname } = useRouter();
  return (
    <footer>
      <Flex
        paddingX={12}
        paddingY={12}
        background='blackAlpha.900'
        justifyContent='space-evenly'
        alignItems='center'
      >
        <Flex gap={12} justifyContent='center'>
          <Link href='/' passHref legacyBehavior>
            <a className={pathname === '/' ? styles['active'] : styles['navbar-link']}>Inicio</a>
          </Link>
          <Link href={'/freelance'} passHref legacyBehavior>
            <a className={pathname === '/freelance' ? styles['active'] : styles['navbar-link']}>Encontrar Trabajo</a>
          </Link>
          <Link href='/recruiter' passHref legacyBehavior>
            <a className={pathname === '/recruiter' ? styles['active'] : styles['navbar-link']}>Encontrar Talento</a>
          </Link>
          <Link href='/signup' passHref legacyBehavior>
            <a className={pathname === '/signup' ? styles['active'] : styles['navbar-link']}>Sign Up</a>
          </Link>
        </Flex>
        <Text color='white' fontSize={18}>&copy; Todos los derechos reservados - { new Date().getFullYear().toString() }</Text>
      </Flex>
    </footer>
  )
}
