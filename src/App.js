import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/home";
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
          </Switch>
        </Router>
      </div>
    );
  }
}
export default index;
