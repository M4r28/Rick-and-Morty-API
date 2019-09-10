import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

//import the style!
import "./singleCharacter.scss";

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
  // useState Hook
  const [page, setPage] = useState(1);
  const [character, SetCharacter] = useState("Morty");

  return (
    <>
      <input
        type="text"
        value={character}
        onChange={e => SetCharacter(e.target.value)}
      />

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

          if (loading) return <p>Loading... wait!</p>;
          if (error) return <p>Oh! My! Godness!</p>;

          next = next ? next : pages;
          prev = prev ? prev : 1;

          return (
            <>
              {" "}
              {count > 0 && count}
              {results ? (
                results.map(({ name, image, status, id }) => (
                  <div key={id}>
                    <p>
                      <img src={image} alt={name} />
                    </p>
                    <p>
                      {name} status: {status}
                    </p>
                  </div>
                ))
              ) : (
                <p>No Results</p>
              )}
              {/*Pagination will be here */}
              <button type="button" onClick={() => setPage(prev)}>
                {" "}
                Prev
              </button>
              <button type="button" onClick={() => setPage(next)}>
                {" "}
                Next
              </button>
              <div>{paginationButton(pages, setPage, page)}</div>
            </>
          );
        }}
      </Query>
    </>
  );
};

const paginationButton = (pageCount, setPage, currentPage) => {
  const pageButtons = [];

  for (let i = 1; i <= pageCount; i++) {
    pageButtons.push(
      <button
        className={currentPage === i ? "btn active" : "btn"}
        key={i}
        onClick={() => setPage(i)}
      >
        {i}
      </button>
    );
  }

  console.log(pageButtons);
  return pageButtons;
};

export default SingleCharacter;
