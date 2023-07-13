import React from 'react';
import propTypes from 'prop-types';
import { Modal, Fade, Box, Typography, Backdrop } from '@mui/material';
import styled from '@emotion/styled';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '1rem',
  p: 4,
};

const BodyModal = styled.section(({ align }) =>({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'flex-end',
  marginTop: '2rem',
  textAlign: align ?? 'center',
  gap: '3rem',
}) );

export default function ModalControl({
  open = false,
  handleClose = () => {},
  title = '',
  children = <></>,
  align = 'center',
}) {
  return (
    <>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id='transition-modal-title' variant='h6' align={align} component='h2'>
              {title}
            </Typography>
            <BodyModal id='transition-modal-description' align={align} >
              {children}
            </BodyModal>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

ModalControl.propTypes = {
  open: propTypes.bool,
  handleClose: propTypes.func,
  title: propTypes.string,
  children: propTypes.node,
  align: propTypes.string,
};
