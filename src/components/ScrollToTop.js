import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


// ScrollToTop function causes all pages to load at the top of the page
export const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
};

export default ScrollToTop;