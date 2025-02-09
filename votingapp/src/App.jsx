import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Header from "./components/header";
import LoginScreen from "./pages/Login";
import RegisterScreen from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
