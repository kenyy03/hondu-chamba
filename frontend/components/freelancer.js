import { CardActionArea, Rating } from '@mui/material';
import styles from '../styles/Freelancer.module.css';
import { useState } from 'react';
import { imageProfileDefault } from '@/config/helpers/constants';
import Image from 'next/image';

export default function Freelancer({ freelancerProp={} }) {
  const [value, setValue] = useState(freelancerProp?.rating ?? 0);
  console.log(freelancerProp);

  const handleViewProfile = () => {
    alert('Proximamente');
  }

  return (
    <CardActionArea>
      <section className={styles['container-freelancer']} >
        <div className={styles['container-freelancer-image']} >
          <Image 
            width={700}
            height={600}
            loading='lazy'
            src={freelancerProp?.imageProfile?.url || freelancerProp?.imageProfile?.url === '' && imageProfileDefault } 
            alt={`freelancer-${freelancerProp?.names}-${freelancerProp?.lastNames}`} 
            className={styles['freelancer-image']} />
            
        </div>
        <div className={styles['container-freelancer-info']} >
          <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}} >
            <h2 className={styles['freelancer-name']} > { freelancerProp?.names }{' '} { freelancerProp?.lastNames } </h2>
            <Rating name="read-only" value={value} readOnly />
          </header>
          <h3 className={styles['freelancer-details']} > { freelancerProp?.ocupation } </h3>
          <h4 className={styles['freelancer-details']} > { freelancerProp?.city } </h4>
          <p className={styles['freelancer-description']} > { freelancerProp?.description } </p>
          <div className={styles['freelancer-skills']} >
            { freelancerProp?.habilities?.map(hability => (<span className={styles.skill} > {hability?.title} </span>)) }
          </div>
          <div className={styles['freelancer-actions']} >
            <div>
              <button className={styles['freelancer-button']} onClick={handleViewProfile} >Ver Perfil</button>
              <button className={styles['freelancer-button']} onClick={handleViewProfile} >Contratar</button>
            </div>
          </div>

        </div>
      </section>
    </CardActionArea>

  )
}
