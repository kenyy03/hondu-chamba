import { background } from '@chakra-ui/react'
import { CircularProgress } from '@mui/material'
import React from 'react'

export default function Loading() {
  return (
    <div 
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100dvh', background: 'rgba(0, 0, 0, 0.2)'  }}
    >
      <CircularProgress color="success" value={66} />
    </div>
  )
}
