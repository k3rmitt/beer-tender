import React, {Component, PropTypes} from 'react';
import {Alert, Table, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetchBeer} from '../actions/';
import _filter from 'lodash/filter';
import _first from 'lodash/first';
import _defaultTo from 'lodash/defaultTo';

class BeerPanel extends Component {
  componentDidMount() {
    this.props.fetchBeer(Number(this.props.beerId));
  }

  componentDidUpdate(prevProps) {
    if (this.props.beerId !== prevProps.beerId) {
      fetchBeer(this.props.beerId);
    }
  }

  render() {
    const {
      hasError,
      loading,
      beer: {name, tagline, description, hops, food_pairing, brewers_tips},
    } = this.props;

    return (
      <Panel
        className={`beer-tender-panel ${loading ? 'fade-in' : ''}`}
        header={`${name}: ${tagline}`}
      >
        {
          !hasError && (
              <Table>
                <tbody>
                  <tr><td>description</td><td>{description}</td></tr>
                  <tr><td>hops</td><td>{hops}</td></tr>
                  <tr>
                    <td>food pairing</td>
                    <td>{_defaultTo(food_pairing, []).join(', ')}</td>
                  </tr>
                  <tr>
                    <td>brewers tips</td><td>{brewers_tips}</td>
                  </tr>
                </tbody>
              </Table>
            )
        }
        {
          hasError && (
              <Alert bsStyle="danger">
                <h4>Oh snap! You got an error!</h4>
              </Alert>
            )
        }
        <p><Link to="/beers">Back to catalog</Link></p>
      </Panel>
    );
  }
}

BeerPanel.propTypes = {
  hasError: PropTypes.bool,
  loading: PropTypes.bool,
  beer: PropTypes.shape({
    name: PropTypes.string,
    tagline: PropTypes.string,
    description: PropTypes.string,
    hops: PropTypes.string,
    food_pairing: PropTypes.array,
    brewers_tips: PropTypes.string,
  }),
};
BeerPanel.defaultProps = {beer: {}};

const mapStateToProps = (
  {beers, navigation: {loading, hasError}},
  {params},
) => ({
  loading,
  hasError,
  beerId: params.id,
  beer: _first(_filter(beers, {id: Number(params.id)})),
});

const mapDispatchToProps = dispatch => ({
  fetchBeer: id => dispatch(fetchBeer(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerPanel);
