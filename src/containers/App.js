import React, { Component, Fragment } from "react";
import "../styles/App.css";
import { connect } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import ImgList from "../components/ImgList";
import Header from "../components/Header";
import {
  inputSearchQueryAction,
  fetchImagesIfNeeded,
  refreshAction
} from "../actions";

class App extends Component {
  componentDidMount() {
    const { dispatch, inputSearchQueryValue } = this.props;
    dispatch(fetchImagesIfNeeded(inputSearchQueryValue));
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch, inputSearchQueryValue } = nextProps;
    const inputDefault = "rainy";
    if (nextProps.inputSearchQueryValue !== this.props.inputSearchQueryValue) {
      setTimeout(
        () => dispatch(fetchImagesIfNeeded(inputSearchQueryValue)),
        3500
      );
      if (inputSearchQueryValue === "") {
        this.props.dispatch(inputSearchQueryAction(inputDefault));
      }
    }
    console.log("nextProps is : ", inputSearchQueryValue);
  }
  handleInputChange = NewUserInputSearch => {
    const description = NewUserInputSearch.target.value.trim();
    this.props.dispatch(inputSearchQueryAction(description));
  };
  handleRefresh = e => {
    e.preventDefault();
    const { dispatch, inputSearchQueryValue } = this.props;
    dispatch(refreshAction(inputSearchQueryValue));
    dispatch(fetchImagesIfNeeded(inputSearchQueryValue));
  };
  render() {
    const { imagesData, isFetching } = this.props;
    const isEmpty = imagesData.length === 0;
    return (
      <Fragment>
        <CssBaseline />
        <div className="App">
          <Header />
          <div>
            <form onSubmit={e => e.preventDefault()}>
              <input
                onChange={this.handleInputChange}
                name="text_input"
                type="text"
                placeholder="Filter search"
              />
              <button type="submit" onClick={this.handleRefresh}>
                Search
              </button>
            </form>
          </div>
          {isEmpty ? (
            isFetching ? (
              <h2> Loading... </h2>
            ) : (
              <h2> Empty </h2>
            )
          ) : (
            <div
              style={{
                opacity: isFetching ? 0.4 : 1
              }}
            >
              <ImgList imagesData={imagesData} isFetching={isFetching} />
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { inputSearchQueryValue, processedDataImages } = state;
  const {
    isFetching,
    lastUpdated,
    dataItems: imagesData
  } = processedDataImages[inputSearchQueryValue] || {
    isFetching: true,
    dataItems: []
  };

  return {
    inputSearchQueryValue,
    imagesData,
    isFetching,
    lastUpdated
  };
};

export default connect(mapStateToProps)(App);
