import React from "react";
//Apollo GraphQL Client
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
//Our component showing all the characters
// import AllCharacters from "./components/allCharacters";
//import switch and route
import { Switch, Route } from "react-router-dom";
import SingleCharacter from "./components/singleCharacter";
import allEpisodes from "./components/allEpisodes";

//Apollo client init
const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/"
});

//Functional Component APP
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={SingleCharacter} />
          <Route path="/episodes" component={allEpisodes} />
        </Switch>
        {/* <AllCharacters /> */}
        {/* <SingleCharacter /> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
