import { useRoutes } from "react-router-dom";
import { currentRoute } from "./Routes/protectedRoutes";

const App = () => {
  const routing = useRoutes(currentRoute);
  return routing;
};
export default App;
