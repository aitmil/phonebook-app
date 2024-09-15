import { Toaster } from 'react-hot-toast';
import AppBar from './AppBar/AppBar';
import { Props } from '../ts/types';

export default function Layout({ children }: Props) {
  return (
    <>
      <AppBar />
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            padding: '16px',
            marginTop: '80px',
          },
        }}
      />
      {children}
    </>
  );
}
