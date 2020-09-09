import React, { Component } from "react";
import CountryPicker from "../../component/CountryPicker/CountryPicker";
import WorldSummary from "../../component/WorldSummary/WorldSummary";
import Statistics from "../../component/Statistics/Statistics";

import axios from "axios";

class MainPage extends Component {
  state = {
    summaryData: {},
    error: false,
  };

  componentDidMount() {
    axios
      .get("")
      .then((response) => {
        const retrievedData = {
          confirmed: response.data.confirmed,
          recovered: response.data.recovered,
          deaths: response.data.deaths,
          lastUpdate: response.data.lastUpdate,
        };

        this.setState({ summaryData: retrievedData });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  render() {
    let SummarySection = <div>Loading</div>;

    // console.log(this.state.summaryData.confirmed.value);

    if (this.state.summaryData) {
      SummarySection = <WorldSummary data={this.state.summaryData} />;
    }

    return (
      <React.Fragment>
        {SummarySection}
        <CountryPicker />
        <Statistics />
      </React.Fragment>
    );
  }
}

export default MainPage;
