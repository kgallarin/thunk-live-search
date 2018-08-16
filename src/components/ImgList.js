import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { GridList, GridListTile, Paper } from "@material-ui/core";

import Responsive from "react-responsive";

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "100%"
    // border: "5px solid black"
  },
  gridListTile: {
    // border: "5px solid black"
  }
});
const ImgList = ({ imagesData, classes, isFetching }) => (
  <div className={classes.root}>
    <Desktop>
      <GridList cellHeight={300} className={classes.gridList} cols={5}>
        {imagesData.map(key => (
          <GridListTile key={key.id} className={classes.gridListTile} cols={1}>
            {<img src={key.urls.regular} alt="/" />}
          </GridListTile>
        ))}
      </GridList>
    </Desktop>
    <Tablet>
      <GridList cellHeight={350} className={classes.gridList} cols={3}>
        {imagesData.map(key => (
          <GridListTile key={key.id} className={classes.gridListTile} cols={1}>
            {<img src={key.urls.regular} alt="/" />}
          </GridListTile>
        ))}
      </GridList>
    </Tablet>
    <Mobile>
      <GridList cellHeight={250} className={classes.gridList} cols={2}>
        {imagesData.map(key => (
          <GridListTile key={key.id} className={classes.gridListTile} cols={1}>
            {<img src={key.urls.thumb} alt="/" />}
          </GridListTile>
        ))}
      </GridList>
    </Mobile>
  </div>
);

export default withStyles(styles)(ImgList);
