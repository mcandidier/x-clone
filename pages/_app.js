import '@/styles/globals.css';
import Layout from '../components/layout';

import { Provider } from 'react-redux';
import store from '../store';

export default function App({ 
    Component, 
    pageProps: {...pageProps },
  }) {

  return (
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
  ) 
}