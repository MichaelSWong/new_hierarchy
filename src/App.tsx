import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './styling/theme';
import HierarchyNodes from './pages/HierarchyNodes';
import Home from './pages/Home';
import MaterialTree from './pages/MaterialTree';
import ComboBox from './pages/ComboBox';
import MatTree from './pages/MatTree';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <>
            <Container maxWidth='md'>
              <Route path='/insert-nodes-tree' component={HierarchyNodes} />
              <Route path='/material-tree' component={MaterialTree} />
              <Route path='/combo-box' component={ComboBox} />
              <Route path='/mat-tree' component={MatTree} />
              <Route exact path='/' component={Home} />
            </Container>
          </>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
