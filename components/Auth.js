import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from "js-cookie";

export const withAuthAndPermission = (PageComponent, permissions) => {
  const WrappedComponent = props => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = Cookies.get('token');
      // Redirect to login page if user is not authenticated
      console.log('login')
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

    //   // Check if user has required permissions
    //   if (!permissions.every(permission => userPermissions.includes(permission))) {
    //     router.push('/unauthorized');
    //     return;
    //   }
    }, []);

    return <PageComponent {...props} />;
  };

  return WrappedComponent;
};
