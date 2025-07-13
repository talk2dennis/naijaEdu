import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import { useAuth } from '../contexts/AuthContext';

const Layout = () => {
  const { toastMsg } = useAuth();

  return (
    <>
      {toastMsg?.message && <Message message={toastMsg.message} type={toastMsg.type} />}
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
