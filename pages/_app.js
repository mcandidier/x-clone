import '@/styles/globals.css';
import Layout from '../components/layout';

import { Provider } from 'react-redux';
import store from '../store'; 

import { Toaster } from 'react-hot-toast';

export default function App({ 
    Component, 
    pageProps: {...pageProps },
  }) {

  return (
      <Provider store={store}>
        <Toaster/>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
  ) 
}