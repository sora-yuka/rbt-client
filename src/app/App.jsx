import { AuthProvider } from "./AuthProvider";
import Router from "./Router";
import "../styles/reset.css";
import "../styles/tokens.css";
import "../styles/globals.css";

const App = () => (
  <AuthProvider>
    <Router />
  </AuthProvider>
);

export default App;
