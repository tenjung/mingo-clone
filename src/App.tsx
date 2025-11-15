import AuthLayout from "./components/common/AuthLayout";
import { Button } from "./components/ui/button";
import SignIn from "./pages/auth/sign-in";
import { defineConfig } from "eslint/config";

function App() {
  return (
    <div>
      <AuthLayout />
    </div>
  );
}

export default App;
