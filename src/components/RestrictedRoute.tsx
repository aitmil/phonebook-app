import { useAppSelector } from '../ts/hooks';
import { RouteProps } from '../ts/types';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

export default function RestrictedRoute({ component, redirectTo }: RouteProps) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
}
