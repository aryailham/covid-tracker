import React, { Component } from "react";
import CountryPicker from "../../component/CountryPicker/CountryPicker";
import WorldSummary from "../../component/WorldSummary/WorldSummary";
import Statistics from "../../component/Statistics/Statistics";

import axios from "axios";

class MainPage extends Component {
  state = {
    summaryData: {},
    error: false,
    currCountry: null,
    url: "",
  };

  componentDidMount() {
    axios
      .get()
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

  countryChangeHandler = (event) => {
    // this.setState({ url: event.target.value });

    let customUrl = "";
    let currCountry = "";
    if (event.target.value !== "global") {
      customUrl = "countries/" + event.target.value;
      currCountry = event.target.value;
    }
    this.setState({ currCountry: currCountry });

    axios
      .get(customUrl)
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
  };

  render() {
    let SummarySection = <div>Loading</div>;

    // console.log(this.state.summaryData.confirmed.value);

    if (this.state.summaryData) {
      SummarySection = <WorldSummary data={this.state.summaryData} />;
    }

    return (
      <React.Fragment>
        {SummarySection}
        <CountryPicker changeCountry={this.countryChangeHandler} />
        <Statistics
          data={this.state.summaryData}
          country={this.state.currCountry}
        />
      </React.Fragment>
    );
  }
}

export default MainPage;
