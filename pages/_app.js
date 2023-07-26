import '@/styles/globals.css';
import Layout from '../components/layout';

import { Provider } from 'react-redux';
import store from '../store'; 

import { Toaster } from 'react-hot-toast';
import { parseCookies } from 'nookies';
import API from '@/libs/api';
import { setCurrentUser } from '@/store/user-slice';
import { useDispatch } from 'react-redux';


export default function App({ 
    Component, 
    pageProps: {...pageProps },
  }) {

  const cookies = parseCookies();
  const token = cookies.token;

  const state = store.getState();

  if(token && !state.auth) {
    API.get('profiles/').then(res => {
      store.dispatch(setCurrentUser(res.data))
    });
  }


  return (
      <Provider store={store}>
        <Toaster/>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
  ) 
}