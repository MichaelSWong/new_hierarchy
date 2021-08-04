import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './styling/theme';
import HierarchyNodes from './pages/HierarchyNodes';
import Home from './pages/Home';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <>
            <Container maxWidth='md'>
              <Route path='/insert-nodes-tree' component={HierarchyNodes} />
              <Route exact path='/' component={Home} />
            </Container>
          </>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
