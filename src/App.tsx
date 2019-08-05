import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import { IndexPage } from "./components/show";
import { Layout } from "antd";
import { Navbar } from "./components/navbar";

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={ {height: "100vh"} }>
        <Layout.Header>
          <Navbar/>
        </Layout.Header>
        <Layout.Content>

          <div>
            <Route path="/" exact component={ IndexPage }/>
            {/*<Route path="/about/" component={About} />*/ }
            {/*<Route path="/users/" component={Users} />*/ }
          </div>

        </Layout.Content>
      </Layout>
    </Router>
  );
}

export default App;
