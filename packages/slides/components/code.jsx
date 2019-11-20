import React from 'react';
import { Box } from 'rebass';

export default ({ children }) => (
  <Box
    as="span"
    sx={{
      background: 'red',
      padding: '.2em .4em',
      margin: 0,
      fontSize: '85%',
      backgroundColor: 'rgba(27,31,35,.05)',
      borderRadius: 3,
    }}
  >
    {children}
  </Box>
);
