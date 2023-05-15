import Layout from '@/components/layout';
import RadioButton from '@/components/radioButton';
import { enviroment } from '@/config/enviroment';
import { ArrowRightIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export default function Login({ roles = [] }) {
  return (
    <Layout title='Login' description='Login Page para usuarios registrados' isOnLogin={true} >
      <Flex
        alignItems='center'
        justifyContent='center'
        width='100dvw'
        height='100dvh'
      >
        <Flex
          background='gray.100'
          borderRadius={5}
          paddingX={10}
          paddingY={8}
          width={'30%'}
          border='1px solid gray'
          flexDirection='column'
          gap={8}
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
          <FormControl size='lg'>
            <FormLabel fontSize={15}>Correo Electronico</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<EmailIcon color='teal.400' size='lg' fontSize={15} />}
              />
              <Input
                color='teal'
                _placeholder={{ color: 'inherit', fontSize: 15 }}
                type='email'
                size='lg'
                variant='flushed'
                placeholder='example@example.com'
              />
            </InputGroup>
          </FormControl>

          <FormControl size='lg'>
            <FormLabel fontSize={15} >Contraseña</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<LockIcon color='teal.400' size='lg' fontSize={15} />}
              />
              <Input
                color='teal'
                _placeholder={{ color: 'inherit', fontSize: 15 }}
                type='password'
                size='lg'
                placeholder='************'
                variant='flushed'
              />
            </InputGroup>
          </FormControl>

          <RadioGroup>
            <Stack direction='row' justifyContent='center' gap={5} fontSize={15} >
              <RadioButton roles={roles ?? []} />
            </Stack>
          </RadioGroup>

          <Button
            borderRadius={15}
            variant='outline'
            colorScheme='teal'
            display='block'
            size='lg'
            fontSize={15}
          >
            <Flex justifyContent='center' alignItems='center'>
              <ArrowRightIcon alignSelf='center' /> <Text fontSize={15} alignSelf='center' >Log In</Text>
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

export async function getStaticProps() {
  const response = await fetch(`${enviroment.DEV_BASE_API_URL}/get-all-roles`);
  const { data = [] } = await response.json();
  return {
    props: {
      roles: data,
    },
  };
}
