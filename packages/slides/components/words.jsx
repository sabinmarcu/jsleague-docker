import React from 'react';
import { Box } from 'rebass';

export default ({ children, style }) => (
  <Box
    sx={{
      color: 'inherit',
      fontSize: 16,
      lineHeight: '24px',
      textAlign: 'center',
      opacity: 0.7,
      ...style,
    }}
  >
    {children}
  </Box>
);
