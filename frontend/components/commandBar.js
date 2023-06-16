import React from 'react';
import PropTypes from 'prop-types';
import ButtonMui from '@mui/material/Button';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import styles from '../styles/Grid.module.css';
import { Fade, Modal, Backdrop, Box } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '1rem',
  boxShadow: 24,
  p: 4,
};

export default function CommandBar({
  onShowModal = () => {},
  onCloseModal = () => {},
  showModal = false,
  onRenderContentModal = () => {},
}) {
  return (
    <section>
      <div className={styles['command-bar-container']}>
        <ButtonMui
          variant='text'
          size='small'
          color='secondary'
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={onShowModal}
        >
          Agregar
        </ButtonMui>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal}
        onClose={onCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={showModal}>
          <Box sx={style}>
            {onRenderContentModal()}
          </Box>          
        </Fade>
      </Modal>
    </section>
  );
}

CommandBar.propTypes = {
  onShowModal: PropTypes.func,
  onCloseModal: PropTypes.func,
  showModal: PropTypes.bool,
  onRenderContentModal: PropTypes.func,
};

CommandBar.defaultProps = {
  onShowModal: () => {},
  onCloseModal: () => {},
  showModal: false,
  onRenderContentModal: () => {},
};