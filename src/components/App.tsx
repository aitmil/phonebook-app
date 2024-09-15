import { useEffect, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Loader from './Loader/Loader';
import RestrictedRoute from './RestrictedRoute';
import PrivateRoute from './PrivateRoute';
import { refreshUser } from '../redux/auth/operations';
import { selectIsRefreshing } from '../redux/auth/selectors';
import { useAppDispatch, useAppSelector } from '../ts/hooks';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const ContactsPage = lazy(() => import('../pages/ContactsPage/ContactsPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(
  () => import('../pages/RegistrationPage/RegistrationPage')
);

export default function App() {
  const dispatch = useAppDispatch();
  const isRefreshing = useAppSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route
            path='/register'
            element={
              <RestrictedRoute
                component={<RegistrationPage />}
                redirectTo='/'
              />
            }
          />
          <Route
            path='/login'
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo='/contacts'
              />
            }
          />
          <Route
            path='/contacts'
            element={
              <PrivateRoute
                component={<ContactsPage />}
                redirectTo='/login'
              />
            }
          />
        </Routes>
      </Suspense>
    </Layout>
  );
}
