import Layout from '@/components/layout'
import { Box } from '@mui/material'
import styles from '../styles/Freelancer.module.css';
import SimpleAccordion from '@/components/simpleAccordion';
import Freelancer from '@/components/freelancer';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { enviroment } from '@/config/enviroment';

const Container = styled.main((props) => ({
  display: 'flex',
  gap: '8rem',
  margin: props.roleName === 'Recruiter' ? '5rem 15rem' : '10rem 15rem',
  marginBottom: '17.5rem',
})); 

export default function FindTalent({ freelancersFetch = [] }) {
  const userInfoState = useSelector(state => state.userReducer.userInfo);

  return (
    <Layout title='Freelancers' description='Find Freelancers' >
      <Container roleName={userInfoState?.role?.name} >
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h1 className={styles.title} >Top Freelancers</h1>
          <h2 className={styles['filter-title']} >Filtros Por</h2>
          <hr />
          <SimpleAccordion my='my-3' fontSize='15px' />
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '2rem' }} >
          <div className={styles['my-10']} >
            { freelancersFetch?.map((freelancer) => 
                <Freelancer key={freelancer?._id} freelancerProp={freelancer} />
            )}
          </div>
        </Box>       
      </Container >
    </Layout>
  )
}

export async function getServerSideProps () {
  try{
    const url = `${enviroment.DEV_BASE_API_URL}/get-users-by-is-public-profile`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', },
    });

    if (!response.ok) throw new Error(`${response?.statusText}: Error al obtener los roles`);

    const { data = [] } = await response.json();

    return {
      props: {
        freelancersFetch: data,
      },
    };
  }catch(error){
    console.log(error);
  }
};
