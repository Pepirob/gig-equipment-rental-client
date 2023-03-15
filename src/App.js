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
import EquipmentDetails from "./pages/EquipmentDetails";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import EquipmentEdit from "./pages/EquipmentEdit";
import PaymentSuccess from "./components/PaymentSuccess";
import CreateEquipment from "./pages/CreateEquipment";
import MyTransactions from "./pages/MyTransactions";

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
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <Profile />
            </IsPrivate>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <IsPrivate>
              <ProfileEdit />
            </IsPrivate>
          }
        />
        <Route
          path="/my-equipment"
          element={
            <IsPrivate>
              <MyEquipment />
            </IsPrivate>
          }
        />
        <Route path="/equipment/:equipmentId" element={<EquipmentDetails />} />
        <Route
          path="/equipment/:equipmentId/edit"
          element={
            <IsPrivate>
              <EquipmentEdit />
            </IsPrivate>
          }
        />
        <Route path="/my-transactions" element={<MyTransactions />} />
        <Route path="/create-equipment" element={<CreateEquipment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
