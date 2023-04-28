import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const withAuthAndPermission = (PageComponent, permissions) => {
  const WrappedComponent = props => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = localStorage.getItem('token');
      // Redirect to login page if user is not authenticated
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
