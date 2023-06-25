import SendIcon from '@mui/icons-material/Send'
import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import TextFieldIcons from './textFieldIcons';
import { IconButton } from '@mui/material';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

const FormStyle = styled.form`
  height: 100%;
  width: 100%;
  padding: 1.2rem 1.8rem;
`;

const CustomSectionContainer = styled.section( ({ collapse }) => ({
  position: 'fixed',
  bottom: 0,
  right: '30px',
  height: !collapse ? '-360px' : '400px',
  width: '300px',
  backgroundColor: 'var(--white)',
  zIndex: '100',
  border: '1px solid var(--gray)',
  borderTopRightRadius: '1rem',
  borderTopLeftRadius: '1rem',
  boxShadow: '0 0 10px var(--gray)',
}) );

const Container = styled.div`
  display: grid;
  flex-direction: column;
  grid-template-rows: 76% 14%;
  height: 100%;
`;

const CustomList = styled.ul`
  text-decoration: none;
  list-style: none;
  overflow: auto;
  height: 100%;
  padding: 0; 

  ::-webkit-scrollbar {
    -webkit-appearance: none;
  }
  ::-webkit-scrollbar:vertical  {
    width:10px;
  }
  ::-webkit-scrollbar-button:increment {
    display: none;
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
  ::-webkit-scrollbar:horizontal {
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #797979;
    border-radius: 20px;
    border: '2px solid #f1f2f3';
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;  
  }
`;

const CustomListItem = styled.li(({ from }) => ({
  margin: '1rem 0',
  width: 'fit-content',
  padding: '.5rem 1rem',
  borderRadius: '1rem',
  backgroundColor: from === 'Me' ?  'var(--sky-blue)' : 'var(--gray)',
  color: from === 'Me' ? 'var(--white)' : 'var(--black)',
  fontSize: '1.2rem',
  ...(from === 'Me' && ({marginLeft: 'auto'}) )
}) );

const Header = styled.header`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid var(--gray);
`;

const FooterChat = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export default function Chat({ socket, userInfo }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    socket.on('message', receiveMessage)

    return () => socket.off('message', receiveMessage);
  }, []);

  const receiveMessage = (message) => {
    setMessages((state) => [...state, message] )
  };
  
  const handleOnSubmitMessages = (e) => {
    e.preventDefault();
    const newMessage = {
      from: 'Me',
      body: message,
    }
    setMessages([...messages, newMessage]);
    const messageToSend = {
      from: `${userInfo?.names} ${userInfo?.lastNames}`,
      body: message,
    };
    socket.emit('message', messageToSend);
    setMessage('');
  }

  const handleCollapseChat = (e) => {
    e.preventDefault();
    setCollapse((state) => !state);
  }

  return (
    <>
      <CustomSectionContainer collapse={collapse} >
        <Header>
          <IconButton aria-label='collapse' color='secondary' onClick={handleCollapseChat} >
            {collapse ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
          </IconButton>
        </Header>
        <FormStyle  onSubmit={handleOnSubmitMessages} >
          <Container>
            {collapse && (
            <>
              <CustomList>
                { (messages.map((message, index) => (
                  <CustomListItem from={message.from}  key={index} >{`${message.from}: ${message.body}`}</CustomListItem>
                )))}
              </CustomList>
              <FooterChat>
                <TextFieldIcons
                  id={1}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name='message'
                  type='text'
                  placeholder='Escribe un mensaje'
                  onRenderIcon={() => (<SendIcon color='secondary' />)}
                  color='secondary'
                  focused={false}
                  variant='outlined'
                  fullWidth={false}
                  size='small'
                />
              </FooterChat>
            </> )}
          </Container>
        </FormStyle>
      </CustomSectionContainer>
    </>
  )
}

Chat.propTypes = {
  socket: propTypes.object.isRequired,
};