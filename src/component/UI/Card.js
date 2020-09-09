import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CountUp from "react-countup";

const useStyles = makeStyles({
  root: {
    width: 345,
    height: 200,
    display: "flex",
    justifyItems: "center",
  },
});

const MediaCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" color="textSecondary" component="p">
            {props.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            <CountUp start={0} end={props.value} duration={3} separator="," />
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {new Date(props.lastUpdate).toDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MediaCard;
