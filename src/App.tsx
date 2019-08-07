import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { IndexPage } from "./components/index/indexPage";
import { Layout } from "antd";
import { Navbar } from "./components/shared/navbar";
import { CreatePage } from "./components/create/createPage";
import { ShowPage } from "./components/show/showPage";
import { EditPage } from "./components/create/editPage";
import { LoginPage } from "./components/auth/loginPage";

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={ {height: "100vh"} }>
        <Layout.Header>
          <Navbar/>
        </Layout.Header>
        <Layout.Content>
          <Switch>
            <Route path="/login" exact component={LoginPage} />
            <Route path="/" exact component={ IndexPage }/>
            <Route path='/create' component={CreatePage} />
            <Route exact path="/:quizUid" component={ShowPage}/>
            <Route exact path="/edit/:quizUid" component={EditPage}/>
          </Switch>
        </Layout.Content>
      </Layout>
    </Router>
  );
}

export default App;
