import { Inter } from 'next/font/google';
import Layout from '@/components/layout';
import styles from '../styles/Grid.module.css';
import { Button, Flex, Text } from '@chakra-ui/react';
import {
  Code,
  SchoolOutlined,
  SportsEsports,
  HouseSidingOutlined,
  Face2,
  Brush,
  ScaleOutlined,
  StorefrontOutlined,
} from '@mui/icons-material';
import BasicCard from '@/components/basicCard';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <Layout title='Home' description='Profesionales Autónomos'>
      <section className={styles.hero}>
        <article className={styles['container-hero']}>
          <div className={styles['container-hero-phrase']}>
            <h1 className={styles['title-hero']}>
              <span>
                Un solo lugar
                <br />
                como debe ser
              </span>
            </h1>
            <p className={styles['description-hero']}>
              <span>
                Contrata aqui mismo. Trabaja aqui mismo <br />y ahora mismo con
                el mejor personal
              </span>
            </p>
            <Button
              marginTop={12}
              colorScheme='teal'
              size='lg'
              paddingY={10}
              paddingX={8}
              borderRadius={15}
            >
              <Text fontSize={20} fontWeight={700}>
                Comienza Ya!
              </Text>
            </Button>
          </div>
          <aside className={styles['hero-image']}></aside>
        </article>
      </section>

      <section className={styles.container}>
        <hr />
        <h1 className={styles['title-category']}>
          Encuentra talento por categoria
        </h1>
        <Flex wrap='wrap' justifyContent='space-between' gap={9} >
          {catergories().map((category) => (
            <BasicCard key={category?.id}  category={category} />
          ))}
        </Flex>
      </section>
    </Layout>
  );
}

export const catergories =(fontSize = 50) => [
  {
    id: 1,
    name: 'Desarrollo & IT',
    totalTalens: 100,
    icons: <Code sx={{fontSize: fontSize}} color='secondary' />,
  },
  {
    id: 2,
    name: 'Marketing',
    totalTalens: 100,
    icons: <StorefrontOutlined sx={{fontSize: fontSize}} color='secondary' />,
  },
  {
    id: 3,
    name: 'Arte & Diseño',
    totalTalens: 100,
    icons: <Brush sx={{fontSize: fontSize}} color='secondary' />,
  },
  {
    id: 4,
    name: 'Legal',
    totalTalens: 100,
    icons: <ScaleOutlined sx={{fontSize: fontSize}} color='secondary' />,
  },
  {
    id: 5,
    name: 'Hogar & Mantenimiento',
    totalTalens: 100,
    icons: <HouseSidingOutlined sx={{fontSize: fontSize}} color='secondary' />,
  },
  {
    id: 6,
    name: 'Entretenimiento',
    totalTalens: 100,
    icons: <SportsEsports sx={{fontSize: fontSize}} color='secondary' />,
  },
  {
    id: 7,
    name: 'Moda y Belleza',
    totalTalens: 100,
    icons: <Face2 sx={{fontSize: fontSize}} color='secondary' />,
  },
  {
    id: 8,
    name: 'Educacion',
    totalTalens: 100,
    icons: <SchoolOutlined sx={{fontSize: fontSize}} color='secondary' />,
  },
];
