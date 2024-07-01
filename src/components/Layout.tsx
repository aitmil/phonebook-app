import { Toaster } from 'react-hot-toast';
import AppBar from './AppBar/AppBar';

export default function Layout({ children }) {
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
