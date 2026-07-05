import { useLocation } from "react-router-dom";

const PageWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-[pageSlide_0.35s_ease-out]">
      {children}
    </div>
  );
};

export default PageWrapper;