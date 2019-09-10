import React, { useState, useRef } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { paginationButton } from "../helpers/index";

//import the style!
import "./singleCharacter.scss";
import { Link } from "react-router-dom";

const SingleCharacterQuery = gql`
  query($page: Int!, $character: String!) {
    characters(page: $page, filter: { name: $character }) {
      info {
        count
        next
        prev
        pages
      }
      results {
        name
        id
        image
        status
      }
    }
  }
`;

const SingleCharacter = () => {
  // Hooks!
  const [page, setPage] = useState(1);
  const [character, SetCharacter] = useState("");
  const inputRef = useRef(null);

  return (
    <div className="container">
      <Query variables={{ page, character }} query={SingleCharacterQuery}>
        {({
          loading,
          error,
          data: {
            characters: {
              info: { next, prev, pages, count } = {},
              results
            } = {}
          } = {}
        }) => {
          console.log(loading, error, results);

          if (loading)
            return (
              <>
                <div className="row wait text-center">
                  <h3> Loading... Wait!</h3>
                </div>
              </>
            );
          if (error)
            return (
              <>
                <div className="row wait text-center">
                  <h3>Oh My Godness! Error</h3>
                </div>
              </>
            );

          next = next ? next : pages;
          prev = prev ? prev : 1;

          return (
            <>
              <nav class="navbar navbar-expand-md navbar-dark bg-dark">
                <span className="navbar-brand">
                  <h2>Rich & Morty API GraphQL</h2>
                </span>

                <Link to="/episodes" className="btn btn-success">
                  Episodes
                </Link>

                <button
                  class="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon" />
                </button>

                <div class="collapse navbar-collapse">
                  <ul class="navbar-nav ml-auto">
                    <input
                      type="text"
                      placeholder="Search a character"
                      ref={inputRef}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={e => SetCharacter(inputRef.current.value)}
                    >
                      Search
                    </button>
                  </ul>
                  <span className="badge badge-success">
                    {" "}
                    Results: {count > 0 && count}
                  </span>
                </div>
              </nav>

              <div className="row text-center">
                {results ? (
                  results.map(({ name, image, status, id }) => (
                    <div className="col-md-3" key={id}>
                      <p>
                        <img src={image} alt={name} />
                      </p>
                      <p>
                        <span className="name">{name}</span>
                        <span className="info">status:</span>{" "}
                        <span className="data">{status}</span>
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="col-md-3">
                    <h2>No Results</h2>
                  </div>
                )}
                {count > 1 && (
                  <div className="btn-group col-4">
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={() => setPage(prev)}
                    >
                      {" "}
                      Prev
                    </button>
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={() => setPage(next)}
                    >
                      {" "}
                      Next
                    </button>
                  </div>
                )}

                <div className="btn-toolbar col-12">
                  <div className="btn-group">
                    {paginationButton(pages, setPage, page)}
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default SingleCharacter;
