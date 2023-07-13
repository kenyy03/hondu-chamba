import SendIcon from '@mui/icons-material/Send'
import propTypes from 'prop-types';
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import TextFieldIcons from './textFieldIcons';
import { Button, IconButton, Tooltip } from '@mui/material';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { setReceiver } from '@/redux/features/userSlice';
import ModalControl from './modal';

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
  transition: 'all .5s ease-in-out',
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
}));

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

const FooterModal = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 1rem;
  gap: 1.5rem;
`;

export default function Chat({ socket, userInfo }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [collapse, setCollapse] = useState(false);
  const [openSendContractDialog, setOpenSendContractDialog] = useState(false);
  const receiverState = useSelector(state => state.userReducer.receiver);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit('client:join', userInfo);

    socket.on('server:loadChats', loadMessages);
    socket.on('server:message', receiveMessage)

    return () => {
      socket.off('server:message', receiveMessage);
      socket.off('server:loadChats', loadMessages);
      socket.off('client:join', userInfo);
      // socket.emit('client:disconnect');
    };
  }, []);

  const loadMessages = (messages = []) => {
    const mappedMessages = messages?.map((message) => ({
      userId: message?.sender._id === userInfo?._id ? message?.sender._id : message?.receiver?._id,
      body: message?.message,
      from: message?.sender._id === userInfo?._id ? 'Me' : `${message?.sender?.names} ${message?.sender?.lastNames}`,
      to: receiverState?._id ?? receiverState?.userId,
    }));
    setMessages([...mappedMessages]);
  }

  const receiveMessage = (message) => {
    dispatch(setReceiver(message));
    setMessages((state) => [...state, message] );
    if (!collapse) {
      setCollapse(true);
    }
  };
  
  const handleOnSubmitMessages = (e) => {
    e.preventDefault();
    const newMessage = {
      userId: userInfo?._id,
      from: 'Me',
      body: message,
      to: receiverState?._id ?? receiverState?.userId ,
    };
    setMessages([...messages, newMessage]);
    const messageToSend = {
      userId: userInfo?._id,
      to: receiverState?._id ?? receiverState?.userId,
      from: `${userInfo?.names} ${userInfo?.lastNames}`,
      body: message,
    };
    socket.emit('client:message', messageToSend);
    setMessage('');
  }

  const handleCollapseChat = (e) => {
    e.preventDefault();
    setCollapse((state) => !state);
  }

  const handleCloseModal = () => setOpenSendContractDialog(false);

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
                { (messages?.map((message, index) => (
                  <CustomListItem from={message?.from}  key={index} >{`${message?.from}: ${message?.body}`}</CustomListItem>
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
                <Tooltip title='Enviar contrato' >
                  <IconButton 
                    aria-label='attach' 
                    color='secondary' 
                    onClick={() => setOpenSendContractDialog(true)} 
                  > 
                    <AttachFileIcon /> 
                  </IconButton>
                </Tooltip>
              </FooterChat>
            </> )}
          </Container>
        </FormStyle>
      </CustomSectionContainer>
      <ModalControl 
        open={openSendContractDialog} 
        handleClose={handleCloseModal} 
        title='Deseas enviar un contrato?' 
      >
        <p>Si envias un contrato, el usuario podrá aceptarlo o rechazarlo.</p>
        <FooterModal>
          <section>
            <Button variant="contained" endIcon={<SendIcon />}>
              Enviar
            </Button>
          </section>
          <section>
            <Button variant="contained" color='error' endIcon={<CancelIcon />} onClick={handleCloseModal} >
              Cancelar
            </Button>
          </section>
        </FooterModal>
      </ModalControl>
    </>
  )
}

Chat.propTypes = {
  socket: propTypes.object.isRequired,
  userInfo: propTypes.object.isRequired,
};