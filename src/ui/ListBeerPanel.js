import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ListBeer from './ListBeer';
import ListBeerNav from './ListBeerNav';
import {nextPage, previousPage} from '../actions';

const ListBeerPanel = (
  {currentPage, hasNextPage, previousPage, nextPage, loading},
) => (
  <div
    className={`beer-tender-panel ${loading ? 'fade-in' : ''}`}
    title="ListBeerPanel"
  >
    <ListBeer />
    <ListBeerNav
      onPrevious={currentPage > 1 ? previousPage : null}
      onNext={hasNextPage ? nextPage : null}
    />
  </div>
);

ListBeerPanel.propTypes = {
  currentPage: PropTypes.number,
  hasNextPage: PropTypes.bool,
  previousPage: PropTypes.func,
  nextPage: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = ({navigation}) => navigation;
const mapDispatchToProps = dispatch => ({
  nextPage: () => dispatch(nextPage()),
  previousPage: () => dispatch(previousPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListBeerPanel);
