import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./style.css";

class index extends React.Component {
  state = {
    toshow: false,
    list: [1, 2, 3, 4, 5],
  };
  changeToshow = (choice) => {
    this.setState({ toshow: choice });
  };
  render() {
    return (
      <>
        <ul
          ref={(ul) => {
            this.ul = ul;
          }}
        >
          <TransitionGroup>
            {this.state.list.map((item, index) => {
              return (
                <CSSTransition
                  in={this.state.toshow}
                  timeout={2000}
                  classNames="boss-text"
                  unmountOnExit
                  appear={true}
                  key={item + index}
                >
                  <div key={item + index}>{item}</div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </ul>
        <button onClick={() => this.changeToshow(true)}>show!!</button>
      </>
    );
  }
}
export default index;
