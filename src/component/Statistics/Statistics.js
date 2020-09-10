import React, { PureComponent } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import classes from "./Statistics.module.css";

class Statistics extends PureComponent {
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
    console.log("updated");
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

    const barChart = this.props.data.confirmed ? (
      <Bar
        data={{
          labels: ["Infected", "Recovered", "Deaths"],
          datasets: [
            {
              label: "People",
              backgroundColor: [
                "rgba(0, 0, 255, 0.5)",
                "rgba(0, 255, 0, 0.5)",
                "rgba(255, 0, 0, 0.5)",
              ],
              data: [
                this.props.data.confirmed.value,
                this.props.data.recovered.value,
                this.props.data.deaths.value,
              ],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: "data in " + this.props.country },
        }}
      />
    ) : null;

    if (!this.props.data.confirmed) {
      return "...loading";
    }

    return (
      <div className={classes.Statistics}>
        {this.props.country ? barChart : lineChart}
      </div>
    );
  }
}

export default Statistics;
