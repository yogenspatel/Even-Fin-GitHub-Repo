import React from "react";
import "./style.scss";

const SearchResults = ({ results } = []) => {
  if (results && results.length) {
    const resultsItems = results.map(item => (
      <div className="row" key={item.id}>
        <div className="col-sm-9">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.full_name}
          </a>
          {item.fork && <div className="forked">forked</div>}
          <p className="alert-light">{item.description}</p>
        </div>
        <div className="col">
          <span className="alert-light">Stars:</span>
          <p className="h5 stars">{item.stargazers_count}</p>
        </div>
        <div className="col">
          <span className="alert-light">License</span>
          {item.license && item.license.name && <p className="h5 license">{item.license.name}</p>}
        </div>
      </div>
    ));
    return (
      <div className="container search-container">
        <hr />
        <p className="col text-center alert-light">SEARCH results</p>
        <div className="search-results">{resultsItems}</div>
      </div>
    );
  }

  return (
    <div className="container search-container">
      <hr />
      <p className="col text-center alert-light">No Search Results found</p>
    </div>
  );
};

export default SearchResults;
