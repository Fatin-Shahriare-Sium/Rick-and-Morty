import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import React, { Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ShowCharacterEpisode from './component/allEpisodes/show-character-episode.jsx'
import ShowSingleEpisode from './component/allEpisodes/show-single-episode.jsx'
import Loading from './component/loading.jsx'
import Navbar from './component/navbar/navbar.jsx'

function App() {
  //code-splitting to optimize performance
  let ShowSingleCharacter = React.lazy(() => import('./component/allCharacter/show-single-character.jsx'))
  let AllLocation = React.lazy(() => import('./component/allLocation/allLocation.jsx'))
  let AllEpisodes = React.lazy(() => import('./component/allEpisodes/allEpisodes.jsx'))
  let AllCharacter = React.lazy(() => import('./component/allCharacter/allCharacter.jsx'))
  let SingleLocationShower = React.lazy(() => import('./component/allLocation/single-location-shower.jsx'))

  let client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Suspense fallback={<Loading />}>
            <Route exact path='/'>
              <AllCharacter />
            </Route>
            <Route exact path='/characters/:characterId'>
              <ShowSingleCharacter />
            </Route>
            <Route exact path='/locations'>
              <AllLocation />
            </Route>
            <Route exact path='/locations/:locationId'>
              <SingleLocationShower />
            </Route>
            <Route exact path='/episodes'>
              <AllEpisodes />
            </Route>
            <Route exact path='/episodes/:episodeId'>
              <ShowSingleEpisode />
            </Route>
            <Route exact path='/characters/episode/:characterId'>
              <ShowCharacterEpisode />
            </Route>

          </Suspense>
        </Switch>

      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
