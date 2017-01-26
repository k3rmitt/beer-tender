import React from 'react';
import {Pager} from 'react-bootstrap';

const ListBeerNav = ({onNext, onPrevious}) => (
  <Pager>
    {
      onPrevious &&
        <Pager.Item href="#" onClick={onPrevious}>Previous</Pager.Item>
    }
    {' '}
    {onNext && <Pager.Item href="#" onClick={onNext}>Next</Pager.Item>}
  </Pager>
);

export default ListBeerNav;
