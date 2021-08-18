import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth='md'>
      <Typography variant='h4' align='center'>
        Home
      </Typography>
      <Box m={1}>
        <Button variant='outlined' component={Link} to='insert-nodes-tree'>
          Insert Nodes Tree
        </Button>
      </Box>
      <Box m={1}>
        <Button variant='outlined' component={Link} to='material-tree'>
          Material Tree
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
