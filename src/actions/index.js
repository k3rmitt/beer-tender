import fetch from 'isomorphic-fetch';
const _find = require('lodash/find');

const MAX_ITEM_PER_PAGE = 20;

export const REQUEST_DATA = 'REQUEST_DATA';
export const RESPONSE_DATA = 'RESPONSE_DATA';

function handleHttpResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(response.status);
  }
}

function requestData() {
  return {type: REQUEST_DATA};
}

function handleResponseData(err, data, page, hasNextPage) {
  return {type: RESPONSE_DATA, err, data, page, hasNextPage};
}

function toPage(pageFromCurrentResolver) {
  return (dispatch, getState) => {
    const {navigation: {currentPage}} = getState();
    return dispatch(getPage(pageFromCurrentResolver(currentPage)));
  };
}

export function nextPage() {
  return toPage(currentPage => {
    return currentPage + 1;
  });
}

export function previousPage() {
  return toPage(currentPage => {
    return currentPage - 1;
  });
}

export function fetchBeer(id) {
  return (dispatch, getState) => {
    dispatch(requestData());
    const {beers} = getState();
    const beerInCache = _find(beers, {id});
    if (beerInCache) {
      return dispatch(handleResponseData(0, []));
    }

    return new Promise((resolve, reject) => {
      fetch(`https://api.punkapi.com/v2/beers/${id}`)
        .then(handleHttpResponse)
        .then(response => response.json())
        .then(beer => {
          beer.fromPage = Number(beer.id) % MAX_ITEM_PER_PAGE + 1;
          resolve(dispatch(handleResponseData(0, beer)));
        })
        .catch(err => {
          console.error('Get an error');
          resolve(dispatch(handleResponseData(err)));
        });
    });
  };
}

export function getPage(page) {
  return (dispatch, getState) => {
    const {cache} = getState();
    dispatch(requestData());

    if (cache[page]) {
      console.info('page cache hited');
      return dispatch(handleResponseData(0, [], page, cache[page].hasNextPage));
    }

    // request an extra item to know if we will have a next page
    return new Promise((resolve, reject) => {
      fetch(
        `https://api.punkapi.com/v2/beers?page=${page}&per_page=${MAX_ITEM_PER_PAGE}`,
      )
        .then(handleHttpResponse)
        .then(result => result.json())
        .then(beers => {
          beers.map(beer => beer.fromPage = page);
          let hasNextPage = beers.length === MAX_ITEM_PER_PAGE;
          resolve(dispatch(handleResponseData(0, beers, page, hasNextPage)));
        });
      /*.catch(err => {
          resolve(dispatch(handleResponseData(err)));
        });*/
    });
  };
}
