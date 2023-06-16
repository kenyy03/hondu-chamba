import Layout from '@/components/layout'
import { Box } from '@mui/material'
import styles from '../styles/Freelancer.module.css';
import SimpleAccordion from '@/components/simpleAccordion';
import FreelancerList from '@/components/freelancerList';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

const Container = styled.main((props) => ({
  display: 'flex',
  gap: '8rem',
  margin: props.roleName === 'Recruiter' ? '5rem 15rem' : '10rem 15rem'
})); 

export default function FindTalent() {
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
            <FreelancerList />
            <FreelancerList />
            <FreelancerList />
            <FreelancerList />
          </div>
        </Box>

        
      </Container >
    </Layout>
  )
}
