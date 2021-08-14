import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Layout } from './components/Layout';
import { Add, Update } from './pages/Asset';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { CreateUserPage } from './pages/CreateUser';
import UserList from './pages/ListUser/UserList';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { enumUserTypes } from './utils';
import { EditUserPage } from './pages/EditUser';
import { ManageAssets } from './pages/ManageAssets';

const { ADMIN } = enumUserTypes;

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <ToastContainer />
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} roles={[ADMIN]} />
            <Route exact path="/login" component={LoginPage} />
            <PrivateRoute exact path="/users" component={UserList} roles={[ADMIN]} />
            <PrivateRoute exact path="/users/create" component={CreateUserPage} roles={[ADMIN]} />
            <PrivateRoute exact path="/users/edit/:id" component={EditUserPage} roles={[ADMIN]} />
            <PrivateRoute exact path="/assets" component={ManageAssets} roles={[ADMIN]} />
            <PrivateRoute exact path="/assets/create" component={Add} roles={[ADMIN]} />
            <PrivateRoute exact path="/assets/edit/:id" component={Update} roles={[ADMIN]} />
            <PrivateRoute
              exact
              path="/assignments"
              component={() => <h1>Manage Assignments</h1>}
              roles={[ADMIN]}
            />
            <PrivateRoute
              exact
              path="/assignments/create"
              component={() => <h1>Create Assignments</h1>}
              roles={[ADMIN]}
            />
            <PrivateRoute
              exact
              path="/assignments/edit/:id"
              component={() => <h1>Edit Assignments</h1>}
              roles={[ADMIN]}
            />
            <PrivateRoute
              exact
              path="/report"
              component={() => <h1>Report Page</h1>}
              roles={[ADMIN]}
            />
            <PrivateRoute
              exact
              path="/requests"
              component={() => <h1>Requests for Returning Page</h1>}
              roles={[ADMIN]}
            />
          </Switch>
        </Layout>
      </Router>
      {/* <MessengerCustomerChat
        pageId="100332745693817"
        appId="2972789566339735"
      /> */}
    </div>
  );
}

export default App;
