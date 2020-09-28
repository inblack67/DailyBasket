import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../src/apollo'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {

  const apolloClient = useApollo(pageProps.initialApolloState)

  return <Layout>
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  </Layout>
}

export default MyApp
