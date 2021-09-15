import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Demo from "./pages/demo";
import Home from "./pages/home";
import ArticleList from "./pages/ArticleList";
// 应用路由
class index extends React.Component {
  render() {
    return (
      <div style={{ scrollBehavior: "smooth" }}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/demo">
              <Demo />
            </Route>
            <Route path="/articleList">
              <ArticleList />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default index;
