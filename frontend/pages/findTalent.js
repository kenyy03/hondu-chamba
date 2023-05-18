import Layout from '@/components/layout'
import { Box } from '@mui/material'
import styles from '../styles/Freelancer.module.css';
import SimpleAccordion from '@/components/simpleAccordion';
import FreelancerList from '@/components/freelancerList';

export default function FindTalent() {
  return (
    <Layout title='Freelancers' description='Find Freelancers' >
      <section className={styles['grid-container-find-work']} >

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h1 className={styles.title} >Top Freelancers</h1>
          <h2 className={styles['filter-title']} >Filtros Por</h2>
          <hr />
          <SimpleAccordion my={'my-3'} />
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '2rem' }} >
          <div className={styles['my-10']} >
            <FreelancerList />
            <FreelancerList />
            <FreelancerList />
            <FreelancerList />
          </div>
        </Box>

        
      </section>
    </Layout>
  )
}
