import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import axios from "axios";

import cx from "classnames";
import classes from "./CountryPicker.module.css";

const CountryPicker = (props) => {
  const [country, setCountry] = useState([]);

  useEffect(() => {
    axios.get("countries").then((response) => {
      const modifiedData = response.data.countries.map(
        (country) => country.name
      );

      setCountry(modifiedData);
    });
  }, []);

  const countryList = country.map((data, i) => {
    return (
      <option key={i} value={data}>
        {data}
      </option>
    );
  });

  return (
    <FormControl>
      <NativeSelect
        defaultValue=""
        onChange={(event) => props.changeCountry(event)}
        className={cx(classes.CountryPicker)}
      >
        <option value="global">Global</option>
        {countryList}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
