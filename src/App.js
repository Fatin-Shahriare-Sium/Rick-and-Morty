import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AllCharacter from './component/allCharacter/allCharacter.jsx'
import ShowSingleCharacter from './component/allCharacter/show-single-character.jsx'
import AllEpisodes from './component/allEpisodes/allEpisodes.jsx'
import ShowCharacterEpisode from './component/allEpisodes/show-character-episode.jsx'
import ShowSingleEpisode from './component/allEpisodes/show-single-episode.jsx'
import AllLocation from './component/allLocation/allLocation.jsx'
import SingleLocationShower from './component/allLocation/single-location-shower.jsx'
import Navbar from './component/navbar/navbar.jsx'


function App() {
  let client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Navbar />
        <Switch>
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
        </Switch>

      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
