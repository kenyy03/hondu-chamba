import { CardActionArea, Rating } from '@mui/material';
import styles from '../styles/Freelancer.module.css';
import { useState } from 'react';

export default function FreelancerList() {
  const [value, setValue] = useState(4);
  return (
    <CardActionArea>
      <section className={styles['container-freelancer']} >
        <div className={styles['container-freelancer-image']} >
          <img src='https://picsum.photos/200/300' alt='freelancer' className={styles['freelancer-image']} />
        </div>
        <div className={styles['container-freelancer-info']} >
          <h2 className={styles['freelancer-name']} >Keny Travanino</h2>
          <p className={styles['freelancer-description']} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
          <div className={styles['freelancer-skills']} >
            <span className={styles.skill} >HTML</span>
            <span className={styles.skill} >CSS</span>
            <span className={styles.skill} >JavaScript</span>
          </div>
          <div className={styles['freelancer-actions']} >
            <Rating name="read-only" value={value} readOnly />
            <article>
              <button className={styles['freelancer-button']} >Ver Perfil</button>
              <button className={styles['freelancer-button']} >Contratar</button>
            </article>
          </div>

        </div>
      </section>
    </CardActionArea>

  )
}
