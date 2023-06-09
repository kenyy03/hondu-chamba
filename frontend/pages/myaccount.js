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
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { IconButton, Switch, Tooltip } from '@mui/material';
import HabilitiesAutocomplete from '@/components/habilitiesAutocomplete';
import styled from '@emotion/styled';
import { imageProfileDefault } from '@/config/helpers/constants';
import MultilineTextField from '@/components/multilineTextField';

const Container = styled.main((props) =>({
  display: 'grid',
  alignItems: 'flex-start',
  gap: '5rem',
  gridTemplateColumns: '1.5fr 3.5fr',
  margin: props.roleName === 'Recruiter' ? '5.1278rem 15rem' : '10.1278rem 15rem',
  ...( props.roleName === 'Recruiter' && ({ marginBottom: '10.1278rem' }) )
}) );

export default function MyAccount() {
  const userInfoState = useSelector(state => state.userReducer.userInfo);
  const habilitiesState = useSelector(state => state.habilitiesReducer.habilities)
  const [user, setUser] = useState(userInfoState ?? {});
  const [photoProfile, setPhotoProfile] = useState({});
  const [habilities, ] = useState(habilitiesState ?? []);
  const [selectedHabilities, setSelectedHabilities] = useState(
    userInfoState?.habilities ?? []
  );
  const [isPublicProfile, setIsPublicProfile] = useState(
    userInfoState?.isPublicProfile ?? false
  );
  const dispatch = useDispatch();
  const router = useRouter();
  

  useEffect(() => {
    if (!userInfoState) {
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
        setUser({});
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
      setUser({});
    }
  };

  const handleInputChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnUpdateUser = async e => {
    e.preventDefault();
    try {
      const url = `${enviroment.DEV_BASE_API_URL}/update-user`;
      const newHabilites = selectedHabilities.map(({ _id }) => _id);
      const userToUpdate = structuredClone(user);
      const { names, lastNames, city, phone, payPerHour, payPerService } = userToUpdate;
      userToUpdate.habilities = newHabilites;
      const isValidUser = newHabilites.length > 0 
        || !([names, lastNames, city, phone].includes('')) 
        || payPerHour > 0 || payPerService > 0 ;

      if (!isValidUser) {
        enqueueSnackbar('Todos los campos son requeridos', { variant: 'error' });
        return;
      }

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userInfoState?.token,
        },
        body: JSON.stringify(userToUpdate),
      });
      if (!response.ok) {
        enqueueSnackbar(`${response.statusText}`, { variant: 'error' });
        return;
      }
      const { data = {} } = await response.json();
      dispatch(setUserInfo(data));
      setUser(data);
      enqueueSnackbar(`Usuario actualizado correctamente`, {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: 'error' });
      dispatch(setUserInfo({}));
      setUser({});
      router.push('/login');
    }
  };

  const handleOnSelectPhoto = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoProfile({
        url: reader.result,
        file,
      });
    };
  };

  const handleOnUploadPhoto = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('imageProfile', photoProfile.file);
      formData.append('_id', user?._id);

      const isImageSelected = !(!photoProfile.file || user?._id === '' || !user?._id);
      if( !isImageSelected ){
        enqueueSnackbar(`Debe seleccionar una imagen`, { variant: 'error' });
        return;
      }

      const response = await fetch(
        `${enviroment.DEV_BASE_API_URL}/change-image-profile`,
        {
          method: 'PUT',
          headers: {
            'x-access-token': userInfoState?.token,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        enqueueSnackbar(`${response.statusText}`, { variant: 'error' });
        return;
      }
      const { data = {}, message = '' } = await response.json();
      dispatch(setUserInfo(data));
      setUser(data);
      setPhotoProfile({});
      enqueueSnackbar(`${message}`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: 'error' });
      dispatch(setUserInfo({}));
      setUser({});
      setPhotoProfile({});
      router.push('/login');
    }
  };

  const handleOnChangePublicProfile = e => {
    const { names, lastNames, city, payPerHour, payPerService } = user;
    const isValidUser = !([names, lastNames, city].includes('')) 
      || payPerHour > 0 || payPerService > 0
      || selectedHabilities.length > 0 ;
    
      if( !isValidUser ){
      enqueueSnackbar(`Debe terminar de configurar su perfil`, { variant: 'error' });
      return;
    }
    
    setIsPublicProfile(e.target.checked);
    handleOnUpdatePublicProfile(e.target.checked);
  };

  const handleOnUpdatePublicProfile = async checked => {
    try {
      const url = `${enviroment.DEV_BASE_API_URL}/public-profile`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userInfoState?.token,
        },
        body: JSON.stringify({
          _id: user?._id,
          isPublicProfile: checked,
        }),
      });

      if (!response.ok) {
        enqueueSnackbar(`${response.statusText}`, { variant: 'error' });
        return;
      }

      const { data = {}, message = '' } = await response.json();
      dispatch(setUserInfo(data));
      setUser(data);
      enqueueSnackbar(`${message}`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: 'error' });
      dispatch(setUserInfo({}));
      setUser({});
      setPhotoProfile({});
      router.push('/login');
    }
  };

  const handleOnSelectValues = (selectedList, selectedItem) => {
    setSelectedHabilities(selectedList);
  };

  return (
    <Layout title='Profile Page' description=' '>
      <Container roleName={userInfoState?.role?.name} >
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
              width={700}
              height={600}
              alt={`${user?._id} - ${user?.names}`}
              src={user?.imageProfile?.url || user?.imageProfile?.url === '' && imageProfileDefault}
              loading='lazy'
              className={styles['user-image']}
            />
            <p className={styles.nameFile}> {photoProfile?.file?.name}</p>

            <Tooltip title='Cambiar Foto' placement='right-start'>
              <div className={styles['photo-select']} id='src-photo'>
                <PhotoCameraOutlinedIcon color='secondary' />
                <input
                  type='file'
                  id='src-photo-input'
                  name='imageProfile'
                  accept='image/*'
                  aria-label='Photo'
                  onChange={handleOnSelectPhoto}
                />
              </div>
            </Tooltip>
          </div>
          <div className={styles['user-info']}>
            <h4 className={styles['user-name']}>
              {user?.names} {user?.lastNames}{' '}
            </h4>
            <div className={styles['user-email']}>
              <EmailOutlinedIcon color='secondary' />
              <span>{user?.email}</span>
            </div>
            <div className={styles['user-email']}>
              <LocalPhoneOutlinedIcon color='secondary' />
              <span>{user?.phone}</span>
            </div>
            <p className={styles['user-email']}>
              <span>{user?.ocupation}</span>
            </p>
            <div className={styles['role']}> {user?.role?.name ?? ''}</div>
            <Tooltip title='Cargar Foto'>
              <IconButton onClick={handleOnUploadPhoto}>
                <FileUploadOutlinedIcon color='secondary' />
              </IconButton>
            </Tooltip>
          </div>
        </section>

        <aside className={styles['edit-profile']}>
          <header className={styles['header-grid']}>
            <h4 className={styles['title-form']}>Editar Perfil</h4>
            {userInfoState?.role?.name == 'Professional' && (
              <div className={styles.switch}>
                <Switch
                  checked={isPublicProfile}
                  onChange={handleOnChangePublicProfile}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <h4 className={styles['title-form']}>Publicar Perfil</h4>
              </div>
            )}
          </header>
          <form>
            <section className={styles['grid-container']}>
              <div className={styles['personal-info']}>
                <div className=''>
                  <h4 className={`${styles['title-form']} ${styles['mb-3']} `}>
                    Informacion Personal
                  </h4>
                </div>
                <div className={styles['mb-3']}>
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
                <div className={styles['mb-3']}>
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
                <div className={styles['mb-3']}>
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
                <div className={styles['mb-3']}>
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
              <div className={styles['align-center']}>
                <div className={styles['Password']}>
                  {
                    userInfoState?.role?.name == 'Professional' && (<>
                      <div className=''>
                        <h4
                          className={`${styles['title-form']} ${styles['mb-3']} `}
                        >
                          Cuota Pago
                        </h4>
                      </div>
                      <div className={styles['mb-3']}>
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
                      <div className={styles['mb-3']}>
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
                      </div>{' '}
                    </>)
                  }
                  {userInfoState?.role?.name == 'Professional' && (<section>
                    <div className=''>
                      <h4
                        className={`${styles['title-form']} ${styles['mb-3']} `}
                      >
                        Informacion Profesional
                      </h4>
                    </div>
                    <div className={styles['mb-3']}>
                      <section className={styles['mb-3']} >
                        <MultilineTextField 
                          id={10}
                          label='Descripcion'
                          value={user?.description}
                          name='description'
                          onChange={handleInputChange}
                          fullWidth={true}                        
                        />
                      </section>
                      <HabilitiesAutocomplete
                        habilities={habilities?.map(({ title='', _id='' }) => ({
                          title,
                          _id,
                        }))}
                        handleOnSelectValues={handleOnSelectValues}
                        selectedHabilities={selectedHabilities}
                      />
                    </div>
                  </section>)}
                </div>
              </div>
            </section>
            <button
              className={styles['btn-update']}
              onClick={handleOnUpdateUser}
            >
              Actualizar Perfil
            </button>
          </form>
        </aside>
      </Container>
    </Layout>
  );
}
