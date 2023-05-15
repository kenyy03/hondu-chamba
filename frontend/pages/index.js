import { Inter } from 'next/font/google';
import Layout from '@/components/layout';
import styles from '../styles/Grid.module.css';
import { Button, Text } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <Layout title='Home' description='Profesionales Autónomos'>
      <section className={styles.hero} >
        <article className={styles['container-hero']} >
          <div className={styles['container-hero-phrase']} >
            <h1 className={styles['title-hero']} ><span>Un solo lugar<br />como debe ser</span></h1>
            <p className={styles['description-hero']} ><span>Contrata aqui mismo. Trabaja aqui mismo <br />y ahora mismo con el mejor personal</span></p>
            <Button marginTop={12} colorScheme='teal' size='lg' paddingY={10} paddingX={8} borderRadius={15}>
              <Text fontSize={20} fontWeight={700} >Comienza Ya!</Text>
            </Button>
          </div>
          <aside className={styles['hero-image']} ></aside>
        </article>
      </section>
    </Layout>
  );
}
