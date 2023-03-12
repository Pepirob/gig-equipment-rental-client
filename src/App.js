import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Error from "./pages/errors/Error";
import NotFound from "./pages/errors/NotFound";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import IsPrivate from "./hoc/isPrivate";
import MyEquipment from "./pages/MyEquipment";
import Equipment from "./pages/Equipment";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <IsPrivate>
              <Dashboard />
            </IsPrivate>
          }
        />
        <Route path="/my-equipment" element={<MyEquipment />} />
        <Route path="/equipment/:equipmentId" element={<Equipment />} />

        {/* error paths */}
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
