import TextFieldIcons from '@/components/textFieldIcons';
import { setUserInfo } from '@/redux/features/userSlice';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/MyAccount.module.css';
import Layout from '@/components/layout';

export default function MyAccount() {
  const userInfoState = useSelector(state => state.userReducer.userInfo);
  const dispatch = useDispatch();

  const handleInputChange = e => {
    dispatch(
      setUserInfo({
        ...userInfoState,
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <Layout title='Profile Page' description=' ' >
      <main className={styles.content} >
        <section className={styles['user-details']}>
          <div className={styles['back-image-container']}>
            <Image
              loading='lazy'
              width={200}
              height={300}
              src='https://demos.creative-tim.com/paper-dashboard-angular/assets/img/damir-bosnjak.jpg'
              alt='back-image'
              className={styles['back-image']}
            />
          </div>
          <div className={styles['user-image-container']}>
            <Image
              width={60}
              height={30}
              alt={`${userInfoState?._id} - ${userInfoState?.names}`}
              src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
              loading='lazy'
              className={styles['user-image']}
            />
          </div>
          <div className={styles['user-info']}>
            <h4 className={styles['user-name']}>
              {userInfoState?.names} {userInfoState?.lastNames}{' '}
            </h4>
            <p className={styles['user-email']}>
              <span>{userInfoState.email}</span>
            </p>
            <p className={styles['user-phone']}>
              <span>{userInfoState?.phone}</span>
            </p>
          </div>
          <hr />
          <div className={styles['role']}> {userInfoState?.role}</div>
        </section>

        <aside className={styles['edit-profile overflow-auto']}>
          <h4 className={styles['title-form']}>Editar Perfil</h4>
          <form>
            <section className={styles['grid-container']}>
              <div className={styles['align-center']} >
                <div className=''>
                  <h4 className={`${styles['title-form']} ${styles['mb-3']} `}>Informacion Personal</h4>
                </div>
                <div className={styles['mb-3']} >
                  <TextFieldIcons
                    id={1}
                    label='Nombres'
                    size='small'
                    variant='outlined'
                    name='names'
                    value={userInfoState?.names}
                    type='text'
                    onChange={handleInputChange}
                    focused={true}
                    color='secondary'
                    placeholder=''
                  />
                </div>
                <div className={styles['mb-3']} >
                  <TextFieldIcons
                    id={2}
                    label='Apellidos'
                    size='small'
                    variant='outlined'
                    name='lastNames'
                    value={userInfoState?.lastNames}
                    type='text'
                    onChange={handleInputChange}
                    focused={true}
                    color='secondary'
                  />
                </div>
                <div className={styles['mb-3']} >
                  <TextFieldIcons
                    id={3}
                    label='Ciudad'
                    size='small'
                    variant='outlined'
                    name='city'
                    value={userInfoState?.city}
                    type='text'
                    onChange={handleInputChange}
                    focused={true}
                    color='secondary'
                  />
                </div>
                <div className={styles['mb-3']} >
                  <TextFieldIcons
                    id={4}
                    label='Telefono'
                    size='small'
                    variant='outlined'
                    name='phone'
                    value={userInfoState?.phone}
                    type='text'
                    onChange={handleInputChange}
                    focused={true}
                    color='secondary'
                  />
                </div>
              </div>
              <div className={styles['Password']}>
                <div className=''>
                  <h4 className={`${styles['title-form']} ${styles['mb-3']} `}>Cuota Pago</h4>
                </div>
                <div className={styles['mb-3']} >
                  <TextFieldIcons
                    id={5}
                    label='Pago por hora'
                    size='small'
                    variant='outlined'
                    name='payPerHour'
                    value={userInfoState?.payPerHour}
                    type='text'
                    onChange={handleInputChange}
                    focused={true}
                    color='secondary'
                  />
                </div>
                <div className={styles['mb-3']} >
                  <TextFieldIcons
                    id={6}
                    label='Pago por Servicio'
                    size='small'
                    variant='outlined'
                    name='payPerService'
                    value={userInfoState?.payPerService}
                    type='text'
                    onChange={handleInputChange}
                    focused={true}
                    color='secondary'
                  />
                </div>
              </div>
            </section>
            <button className={styles['btn-update']}>Actualizar Perfil</button>
          </form>
        </aside>
      </main>
    </Layout>
  );
}
