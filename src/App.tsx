import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { IndexPage } from "./components/indexPage";
import { Layout } from "antd";
import { Navbar } from "./components/navbar";
import { CreatePage } from "./components/createPage";
import { ShowPage } from "./components/showPage";

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={ {height: "100vh"} }>
        <Layout.Header>
          <Navbar/>
        </Layout.Header>
        <Layout.Content>
          <Switch>
            <Route path="/" exact component={ IndexPage }/>
            <Route path='/create' component={CreatePage} />
            <Route path="/:quizUid" component={ShowPage}/>
          </Switch>
        </Layout.Content>
      </Layout>
    </Router>
  );
}

export default App;
