import TextFieldIcons from '@/components/textFieldIcons';
import { setUserInfo } from '@/redux/features/userSlice';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/MyAccount.module.css';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import { enviroment } from '@/config/enviroment';
import { enqueueSnackbar } from 'notistack';

export default function MyAccount() {
  const userInfoState = useSelector(state => state.userReducer.userInfo);
  const [user, setUser] = useState(userInfoState ?? {});
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if(!userInfoState){
      router.push('/login');
      return;
    }

    fetchUserInfo();

  }, []);

  const fetchUserInfo = async () => {
    try {
      const url = `${enviroment.DEV_BASE_API_URL}/user-by-id?_id=${userInfoState?._id}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userInfoState?.token,
        },
      });
      if (!response.ok) {
        router.push('/login');
        dispatch(setUserInfo({}));
        setUser({})
        enqueueSnackbar(`${response.statusText}`, { variant: 'error' });
        return;
      }
      const { data = {} } = await response.json();
      dispatch(setUserInfo(data));
      setUser(data);
    } catch (error) {
      router.push('/login');
      enqueueSnackbar(`${error}`, { variant: 'error' });
      dispatch(setUserInfo({}));
      setUser({})
    }
  };

  const handleInputChange = e => {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
  };

  const handleOnUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const url = `${enviroment.DEV_BASE_API_URL}/update-user`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userInfoState?.token,
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        enqueueSnackbar(`${response.statusText}`, { variant: 'error' });
        return;
      }
      const { data = {} } = await response.json();
      dispatch(setUserInfo(data));
      setUser(data);
      enqueueSnackbar(`Usuario actualizado correctamente`, { variant: 'success' });
    }catch(error){
      enqueueSnackbar(`${error}`, { variant: 'error' });
      dispatch(setUserInfo({}));
      setUser({})
    }
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
              alt={`${user?._id} - ${user?.names}`}
              src={`https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
              loading='lazy'
              className={styles['user-image']}
            />
          </div>
          <div className={styles['user-info']}>
            <h4 className={styles['user-name']}>
              {user?.names} {user?.lastNames}{' '}
            </h4>
            <p className={styles['user-email']}>
              <span>{user?.email}</span>
            </p>
            <p className={styles['user-phone']}>
              <span>{user?.phone}</span>
            </p>
            <p className={styles['user-phone']}>
              <span>{user?.ocupation}</span>
            </p>
          </div>
          <hr />
          <div className={styles['role']}> {user?.role?.name ?? ''}</div>
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
                    value={user?.names}
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
                    value={user?.lastNames}
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
                    value={user?.city}
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
                    value={user?.phone}
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
                    value={user?.payPerHour}
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
                    value={user?.payPerService}
                    type='text'
                    onChange={handleInputChange}
                    focused={true}
                    color='secondary'
                  />
                </div>
              </div>
            </section>
            <button className={styles['btn-update']} onClick={handleOnUpdateUser} >Actualizar Perfil</button>
          </form>
        </aside>
      </main>
    </Layout>
  );
}
