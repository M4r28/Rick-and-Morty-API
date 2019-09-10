import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

import { paginationButton } from '../helpers';

const allEpisodesQuery = gql`
  query($page: Int!) {
    episodes(page: $page) {
      info {
        count
        next
        prev
        pages
      }
      results {
        id
        name
        air_date
      }
    }
  }
`;

export default function AllEpisodes() {
  const [page, setPage] = useState(1);

  return (
    <div className="container">
      <Query variables={{ page }} query={allEpisodesQuery}>
        {({
          loading,
          error,
          data: {
            episodes: { info: { next, prev, pages, count } = {}, results } = {},
          } = {},
        }) => {
          console.log(loading, error, results);

          if (loading)
            return (
              <>
                <div className="row wait text-center">
                  <h3>Loading...</h3>
                </div>
              </>
            );

          if (error)
            return (
              <>
                <div className="row wait text-center">
                  <h3>Oh no error happend...</h3>
                </div>
              </>
            );

          next = next ? next : page;
          prev = prev ? prev : 1;

          return (
            <>
              <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <span className="navbar-brand">
                  <h2>Rich & Morty API GraphQL</h2>
                </span>

                <Link to="/" className="btn btn-success">
                  All characters
                </Link>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse">
                  <ul className="navbar-nav ml-auto" />
                  <span className="badge badge-success">
                    {' '}
                    Results: {count && count}
                  </span>
                </div>
              </nav>

              {/* BS Table to show the episodes */}

              <table className="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Air on</th>
                  </tr>
                </thead>
                <tbody>
                  {results ? (
                    results.map(({ id, name, air_date }) => (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{name}</td>
                        <td>{air_date}</td>
                      </tr>
                    ))
                  ) : (
                    <div className="col-md-3">
                      <h2>No Results</h2>
                    </div>
                  )}
                </tbody>
              </table>
              {count > 0 && (
                <div className="btn-group col-4">
                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={() => setPage(prev)}
                  >
                    {' '}
                    Prev
                  </button>
                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={() => setPage(next)}
                  >
                    {' '}
                    Next
                  </button>
                </div>
              )}

              <div className="btn-toolbar col-12">
                <div className="btn-group">
                  {paginationButton(pages, setPage, page)}
                </div>
              </div>
            </>
          );
        }}
      </Query>
    </div>
  );
}
