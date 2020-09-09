import React, { Component } from "react";

import "./App.css";
import Layout from "./component/Layout/Layout";
import MainPage from "./container/MainPage/MainPage";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <MainPage />
        </Layout>
      </div>
    );
  }
}

export default App;
