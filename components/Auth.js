import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';

export const withAuthAndPermission = (PageComponent, permissions) => {
  const WrappedComponent = props => {
    const router = useRouter();


    useEffect(() => {
      const cookies = parseCookies();
      const token = cookies.token;

      const isAuthenticated = token;

      // Redirect to login page if user is not authenticated
      if (!isAuthenticated || token === 'undefined') {
        router.push('/login');
        return;
      }

    }, []);

    return <PageComponent {...props} />;
  };

  return WrappedComponent;
};