import Layout from '@/components/layout';
import { enviroment } from '../config/enviroment';
import { ArrowRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { AccountCircle } from '@mui/icons-material';
import React, { useState } from 'react';
import TextFieldIcons from '@/components/textFieldIcons';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/redux/features/userSlice';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import TextFieldPassword from '@/components/textFieldPassword';

export default function Login() {
  const [userLog, setUserLog] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleInputChanges = e => {
    setUserLog({
      ...userLog,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    const url = `${enviroment?.DEV_BASE_API_URL}/login`;
    setUserLog({ email: '', password: '' });
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLog),
      });
      const { data = {}, message='' } = await response.json();
      if(!response.ok){
        enqueueSnackbar(`${response.statusText}: ${message}`, { variant: 'error' });
        return;
      }
      enqueueSnackbar(`${response.statusText}: ${message}`, { variant: 'success' })
      dispatch(setUserInfo(data));
      if(data?.role?.name === 'Recruiter') {
        router.push('/findWork')
        return;
      }
      router.push('/findTalent');
    } catch (error) {
      console.error(error);
    }
  };

  const onRenderAccountIcon = () => (<AccountCircle color='secondary' />);

  return (
    <Layout
      title='Login'
      description='Login Page para usuarios registrados'
      isOnLogin={true}
    >
      <Flex
        alignItems='center'
        justifyContent='center'
        width='100dvw'
        height='88.2dvh'
      >
        <Flex
          background='gray.100'
          borderRadius={5}
          paddingX={10}
          paddingY={8}
          width={'30%'}
          border='1px solid gray'
          flexDirection='column'
          gap={12}
        >
          <Heading
            as='h2'
            size='lg'
            textAlign='center'
            borderBottom='1px solid gray'
            paddingBottom={3}
            marginY={2}
            fontSize={28}
          >
            Log in to HonduFreelance
          </Heading>
          <TextFieldIcons
            id={1} 
            label='Correo Electrónico'
            name='email'
            value={userLog?.email}
            onChange={handleInputChanges}
            onRenderIcon={onRenderAccountIcon}
            placeholder='example@example.com'
            type='email'
            color='secondary'
            focused={true}
          />

          <TextFieldPassword 
            id={3}
            value={userLog?.password}
            onChange={handleInputChanges}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />

          <Button
            borderRadius={15}
            marginTop={12}
            variant='outline'
            colorScheme='teal'
            display='block'
            size='lg'
            fontSize={15}
            type='button'
            onClick={() => handleLogin()}
          >
            <Flex justifyContent='center' alignItems='center'>
              <ArrowRightIcon alignSelf='center' />{' '}
              <Text fontSize={15} alignSelf='center'>
                Log In
              </Text>
            </Flex>
          </Button>

          <Flex flexDirection='column' gap={3}>
            <Text size='sm' fontWeight='light' textAlign='center'>
              ¿No tienes cuenta HonduFreelance?
            </Text>

            <Box display='flex' justifyContent='center'>
              <Button
                borderRadius={15}
                colorScheme='teal'
                size='lg'
                fontSize={15}
                paddingX={12}
              >
                Sign Up
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}
