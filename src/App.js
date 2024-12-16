import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { WebRoutes, AdminRoutes } from "./routes";
import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import LoginAdmin from "./pages/Admin/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/san-pham" />} />

          {/* Web Routes */}
          {WebRoutes.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              element={
                <DefaultLayout>
                  <route.component />
                </DefaultLayout>
              }
            />
          ))}

          {/* Login Route */}
          <Route path="/admin" element={<LoginAdmin />} />

          {/* Protected Admin Routes */}
          {AdminRoutes.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <route.component />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
