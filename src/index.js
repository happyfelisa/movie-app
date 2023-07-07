import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache,HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink( ),
    uri: "http://localhost:3100/graphql",
    cache: new InMemoryCache(),
  });

createRoot(document.getElementById('root')).render(<ApolloProvider client={client}><App /></ApolloProvider> );
