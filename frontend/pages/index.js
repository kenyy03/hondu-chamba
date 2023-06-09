import { Inter } from 'next/font/google';
import Layout from '@/components/layout';
import styles from '../styles/Grid.module.css';
import { Button, Flex, Text } from '@chakra-ui/react';
import BasicCard from '@/components/basicCard';
import { enviroment } from '@/config/enviroment';
import { categoriesIcons } from '@/config/helpers/constants';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '@/redux/features/categorySlice';
import styled from '@emotion/styled';
import { setHabilities } from '@/redux/features/habilitiesSlice';

const inter = Inter({ subsets: ['latin'] });
const Container = styled.section((props) => ({
  marginTop: props.roleName === 'Recruiter' ? '5rem' : '10rem',
  marginBottom: '2rem',
  height: '550px',
})); 

export default function Home({ categories = [], habilities = []}) {
  const [categoriesIconsState, setCategoriesIconsState] = useState(categories);
  const userInfoState = useSelector(state => state.userReducer.userInfo);
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
    
    dispatch(setCategories(categoriesFontSize25));
    dispatch(setHabilities(habilities))
  }, []);
  return (
    <Layout title='Home' description='Profesionales Autónomos'>
      <Container roleName={userInfoState?.role?.name} >
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
      </Container>

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
  const urlHabilities = `${enviroment.DEV_BASE_API_URL}/get-habilities`;
  try {
    const [responseCategories, reponseHabilities] = await Promise.all([
      fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
      }),
      fetch(urlHabilities, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
      }),
      
    ]);

    if (!responseCategories.ok || !reponseHabilities.ok)
      throw new Error(`${response.statusText}: Error al obtener los roles`);
    
    const [{ data:categories = [] }, { data:habilities = [] } ] = 
      await Promise.all( [responseCategories.json(), reponseHabilities.json()]);
  
    return {
      props: {
        categories,
        habilities,
      },
    };
  } catch (error) {
    console.error(error);
  }
};
