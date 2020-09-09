import React, { Component } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import classes from "./Statistics.module.css";

class Statistics extends Component {
  state = {
    dailyStatistics: [],
  };

  componentDidMount = () => {
    axios
      .get("daily")
      .then((result) => {
        console.log(result.data);

        const allData = result.data.map((data) => ({
          confirmed: data.confirmed.total,
          deaths: data.deaths.total,
          date: data.reportDate,
        }));

        this.setState({ dailyStatistics: allData });
      })
      .catch((err) => {});
  };

  render() {
    console.log(this.state.dailyStatistics);
    let lineChart = null;

    if (this.state.dailyStatistics) {
      lineChart = (
        <Line
          data={{
            labels: this.state.dailyStatistics.map(({ date }) => date),
            datasets: [
              {
                data: this.state.dailyStatistics.map(
                  ({ confirmed }) => confirmed
                ),
                label: "infected",
                borderColor: "#3333ff",
                fill: true,
              },
              {
                data: this.state.dailyStatistics.map(({ deaths }) => deaths),
                label: "deaths",
                borderColor: "red",
                backgroundColor: "rgba (255, 0, 0, 0.5)",
                fill: true,
              },
            ],
          }}
        />
      );
    }

    return <div className={classes.Statistics}>{lineChart}</div>;
  }
}

export default Statistics;