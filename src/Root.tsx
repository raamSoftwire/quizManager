import * as React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { browserHistory } from "./browserHistory";
import { persistor, store } from "./store";
import { IndexPage } from "./components/index/indexPage";
import { Layout } from "antd";
import { Navbar } from "./components/shared/navbar";
import { CreatePage } from "./components/create/createPage";
import { ShowPage } from "./components/show/showPage";
import { EditPage } from "./components/create/editPage";
import { LoginPage } from "./components/auth/loginPage";
import { PersistGate } from "redux-persist/integration/react";

export class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedRouter history={browserHistory}>
            <Layout style={{ height: "100vh" }}>
              <Layout.Header className={"baseColor"}>
                <Navbar />
              </Layout.Header>
              <Layout.Content>
                <Switch>
                  <Route path="/login" exact component={LoginPage} />
                  <Route path="/" exact component={IndexPage} />
                  <Route path="/create" component={CreatePage} />
                  <Route exact path="/:quizUid" component={ShowPage} />
                  <Route exact path="/edit/:quizUid" component={EditPage} />
                </Switch>
              </Layout.Content>
            </Layout>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}
