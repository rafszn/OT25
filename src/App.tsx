import { Routes } from "react-router-dom";
import { createRoutes, routes } from "./_routes";

const App = () => {
  return <Routes>{createRoutes(routes)}</Routes>;
};
export default App;
