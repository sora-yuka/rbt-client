import { AuthProvider } from "./AuthProvider";
import Router from "./Router";
import "../styles/reset.css";
import "../styles/tokens.css";
import "../styles/globals.css";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
