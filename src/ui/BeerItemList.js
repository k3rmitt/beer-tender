import React, {PropTypes} from 'react';
import {ListGroupItem, Label} from 'react-bootstrap';

const ListBeerItem = ({beer: {name, tagline, first_brewed}}, ...props) => (
  <ListGroupItem header={name}>
    <code>{tagline}</code> <Label>{first_brewed}</Label>
  </ListGroupItem>
);

ListBeerItem.propTypes = {
  beer: PropTypes.shape({
    name: PropTypes.string,
    tagline: PropTypes.string,
    first_brewed: PropTypes.string,
  }),
};

export default ListBeerItem;
