import React, { Component } from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

export default class LoaderSpinner extends Component {
  render() {
    return(
      <>
        <div className={'loader-spinner'}>Loading...</div>
        <Loader className={'loader-spinner'} type="Oval" color="#00BFFF" height={ 25 } width={ 25 } />
      </>
    );
  }
}