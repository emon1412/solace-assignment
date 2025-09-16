'use client'

import { Box } from '@mui/material'
import { getColorForSpecialty } from './utils'

interface SpecialtyTagProps {
  name: string
}

export default function SpecialtyTag({ name }: SpecialtyTagProps) {
  const isRainbow = name === 'LGBTQ'

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        bgcolor: isRainbow ? undefined : getColorForSpecialty(name),
        background: isRainbow
          ? 'linear-gradient(90deg, #e40303, #ff8c00, #ffed00, #008026, #004dff, #750787)'
          : undefined,
        color: 'white',
        borderRadius: '12px',
        px: 1,
        py: 0.5,
        mr: 0.5,
        mb: 0.5,
        fontSize: '0.75rem',
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      {name}
    </Box>
  )
}