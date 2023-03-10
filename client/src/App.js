import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Single from '../src/pages/Single';
import Home from '../src/pages/Home';
import Login from './pages/Login';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/campaign/:id" element={<Single />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>


    </ApolloProvider>
  );
}

export default App;
