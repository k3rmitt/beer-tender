import React from 'react';
import {connect} from 'react-redux';
import _filter from 'lodash/filter';
import _first from 'lodash/first';

import {BrowserRouter, Match, Redirect} from 'react-router';

import {nextPage, previousPage} from './actions';

import ListBeerPanel from './ui/ListBeerPanel';
import BeerPanel from './ui/BeerPanel';
import LoadingPanel from './ui/LoadingPanel';
import Header from './ui/Header';
import Footer from './ui/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import './App.css';

const App = ({isLoading}) => (
  <BrowserRouter>
    <div>
      <Header />
      <div className="beer-tender-content container bs-docs-container">
        <Match exactly pattern="/" render={() => <Redirect to="/beers" />} />
        <Match exactly pattern="/beers" component={ListBeerPanel} />
        <Match pattern="/beer/:id" component={BeerPanel} />
        {isLoading && <LoadingPanel />}
      </div>
      <Footer />
    </div>
  </BrowserRouter>
);

App.defaultProps = {currentPage: 1};

const mapStateToProps = ({navigation}) => ({isLoading: navigation.loading});

const mapDispatchToProps = dispatch => ({
  goToPreviousPage: () => dispatch(previousPage()),
  goToNextPage: () => dispatch(nextPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
