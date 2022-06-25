import { Outlet } from "react-router-dom";
import { useLogging } from "hooks/useLogging";
import { useLocation } from "react-router-dom";

const App = () => {
  const { logCounter, KNOWN_LABELS } = useLogging();
  const location = useLocation();

  logCounter(KNOWN_LABELS.VISIT, { path: location.pathname });
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
