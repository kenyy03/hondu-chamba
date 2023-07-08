import { background } from '@chakra-ui/react'
import { CircularProgress } from '@mui/material'
import React from 'react'

export default function Loading() {
  const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100dvh',
    background: 'rgba(0, 0, 0, 0.2)',
    zIndex: 9999,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
  };
  return (
    <div style={styles}>
      <CircularProgress color='success' value={66} />
    </div>
  );
}
