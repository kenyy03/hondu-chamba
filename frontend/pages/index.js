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
import { enviroment } from '@/config/enviroment';
import { categoriesIcons } from '@/config/helpers/constants';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCategories } from '@/redux/features/categorySlice';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ categories = []}) {
  const [categoriesIconsState, setCategoriesIconsState] = useState(categories);
  const dispatch = useDispatch();

  useEffect(() => {
    const categoriesMap = categories?.map((category) => ({
      ...category,
      icons: categoriesIcons()[category?.name] ?? <div />,
    }));

    setCategoriesIconsState(categoriesMap);
    const categoriesFontSize25 = categories?.map((category) => ({
      ...category,
      icons: categoriesIcons(25)[category?.name] ?? <div />,
    }));
    dispatch(setCategories(categoriesFontSize25))
  }, []);
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
          {categoriesIconsState?.map((category) => (
            <BasicCard key={category?._id}  category={category} />
          ))}
        </Flex>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const url = `${enviroment.DEV_BASE_API_URL}/get-all-categories`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(`${response.statusText}: Error al obtener los roles`);
    const { data = [] } = await response.json();
  
    return {
      props: {
        categories: data,
      },
    };
  } catch (error) {
    console.error(error);
  }
};

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
