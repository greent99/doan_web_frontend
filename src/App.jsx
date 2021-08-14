import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Layout } from './components/Layout';
import { Add, Update } from './pages/Category';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { CreateUserPage } from './pages/CreateUser';
import UserList from './pages/ListUser/UserList';
import CategoryList from './pages/ListCategory/CategoryList';
import FieldList from './pages/ListField/FieldList';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { enumUserTypes } from './utils';
import { EditUserPage } from './pages/EditUser';
import { ManageAssets } from './pages/ManageAssets';
import { AddField, UpdateField } from './pages/Field';

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
            <PrivateRoute exact path="/categories" component={CategoryList} roles={[ADMIN]} />
            <PrivateRoute exact path="/categories/create" component={Add} roles={[ADMIN]} />
            <PrivateRoute exact path="/categories/edit/:id" component={Update} roles={[ADMIN]} />
            <PrivateRoute exact path="/fields" component={FieldList} roles={[ADMIN]} />
            <PrivateRoute exact path="/fields/create" component={AddField} roles={[ADMIN]} />
            <PrivateRoute exact path="/fields/edit/:id" component={UpdateField} roles={[ADMIN]} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
