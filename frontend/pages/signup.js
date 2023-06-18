import Layout from '@/components/layout';
import TextFieldIcons from '@/components/textFieldIcons';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import styles from '@/styles/Signup.module.css';
import RadioButton from '@/components/radioButton';
import SendIcon from '@mui/icons-material/Send';
import { enviroment } from '@/config/enviroment';
import * as Helper from '@/config/helpers/index';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/redux/features/userSlice';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';

const initialUser = {
  names: '',
  lastNames: '',
  email: '',
  password: '',
  phone: '',
  role: '',
  ocupation: '',
}
export default function Signup({ roles = [] }) {
  const [selectedRole, setSelectedRole] = useState('');
  const [newUser, setNewUser] = useState(initialUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleInputChanges = e => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSelectOption = e => {
    setSelectedRole(e.target.value);
    setNewUser({
      ...newUser,
      role: e.target.value,
    });
  };

  const handleCreateAccount = async () => {
    const url = `${enviroment?.DEV_BASE_API_URL}/signup`;
    try {
      const { names, lastNames, email, ocupation, password, phone, role } = newUser;
      if([names, lastNames, email, ocupation, password, phone].includes('')){
        enqueueSnackbar('Todos los campos son requeridos', { variant: 'error' });
        return;
      }

      if (!Helper.isFullObjectAndValues(newUser)) {
        enqueueSnackbar('Todos los campos son requeridos', { variant: 'error' } );
        return;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok)
        throw new Error(`${response.statusText}: Error al crear la cuenta`);
      
      const { data = {}, message='' } = await response.json();
      console.log(data);
      dispatch(setUserInfo(data));
      setNewUser(initialUser);
      enqueueSnackbar(`${response?.statusText}: ${message}`, { variant: 'success' });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title='Signup' description='Signup Page para usuarios registrados'>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100dvw',
          height: '88.2dvh',
          margin: '9rem 0 2.5rem 0',
        }}
      >
        <Box
          sx={{
            padding: '2.5rem',
            backgroundColor: 'var(--light-gray)',
            borderRadius: '1rem',
            boxShadow: '0 0 1rem var(--dark-gray)',
            width: '38%',
          }}
        >
          <h1 className={styles.title}>
            Registrate para <br /> Comenzar tus sueños 
          </h1>
          <form className={styles.form} >
            <section className={styles['container-fields']} >
              <TextFieldIcons
                id={1}
                name='names'
                label='Nombres'
                type='text'
                onChange={handleInputChanges}
                value={newUser?.names}
                placeholder='Ingresa tus nombres'
                focused={true}
                color='secondary'
                variant='outlined'
                size='small'
              />
              <TextFieldIcons
                id={2}
                name='lastNames'
                label='Apellidos'
                type='text'
                onChange={handleInputChanges}
                value={newUser?.lastNames}
                placeholder='Ingresa tus apellidos'
                focused={true}
                color='secondary'
                variant='outlined'
                size='small'
              />
            </section>
            <section className={styles['container-fields']} >
              <TextFieldIcons
                id={3}
                name='email'
                label='Correo Electrónico'
                type='email'
                onChange={handleInputChanges}
                value={newUser?.email}
                placeholder='example@example.com'
                focused={true}
                color='secondary'
                variant='outlined'
                size='small'
              />
              <TextFieldIcons
                id={4}
                name='phone'
                label='Telefono'
                type='text'
                onChange={handleInputChanges}
                value={newUser?.phone}
                placeholder='(+504) 9999-9999'
                focused={true}
                color='secondary'
                variant='outlined'
                size='small'
              />
              <TextFieldIcons
                id={5}
                name='ocupation'
                label='Ocupacion'
                type='text'
                onChange={handleInputChanges}
                value={newUser?.ocupation}
                placeholder='example@example.com'
                focused={true}
                color='secondary'
                variant='outlined'
                size='small'
              />
            </section>
            <section className={styles.footer} >
              <TextFieldIcons
                id={6}
                name='password'
                label='Contraseña'
                type='password'
                onChange={handleInputChanges}
                value={newUser?.password}
                placeholder='********'
                focused={true}
                color='secondary'
                variant='outlined'
                fullWidth={true}
                size='small'
              />
              <RadioButton
                selectedOption={selectedRole}
                handleOnSelectOption={handleOnSelectOption}
                roles={roles}
              />
              <Button 
                variant='contained' 
                color='secondary' 
                endIcon={<SendIcon />} 
                onClick={handleCreateAccount}
              >
                Crear mi cuenta
              </Button>
            </section>      
          </form>
        </Box>
      </Box>
    </Layout>
  );
}

export async function getStaticProps() {
  const url = `${enviroment.DEV_BASE_API_URL}/get-all-roles`;
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
        roles: data,
      },
    };
  } catch (error) {
    console.error(error);
  }
}
