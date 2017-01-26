import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {getPage} from '../actions/';
import {Panel, ListGroup} from 'react-bootstrap';
import BeerItemList from './BeerItemList';

class ListBeer extends Component {
  componentDidMount() {
    this.props.getPage(this.props.currentPage || 1);
  }

  render() {
    const {beers, currentPage} = this.props;
    return (
      <Panel
        collapsible
        defaultExpanded
        header={`Beer catalog - page ${currentPage}`}
      >
        <div className="beer-tender-panel-inner">
          <ListGroup>
            {beers.map(beer => (
              <Link key={beer.id} to={`/beer/${beer.id}`}>
                <BeerItemList beer={beer} />
              </Link>
            ))}
          </ListGroup>
        </div>
      </Panel>
    );
  }
}

ListBeer.propTypes = {beers: PropTypes.array};
ListBeer.defaultProps = {beers: []};

const mapStateToProps = ({beers, navigation: {currentPage}}) => ({
  beers: beers.filter(beer => beer.fromPage === currentPage),
  currentPage,
});
const mapDispatchToProps = dispatch => ({
  getPage: page => dispatch(getPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListBeer);
