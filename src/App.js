import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { WebRoutes, AdminRoutes} from "./routes";
import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import AdminLayout from "./components/AdminLayout/AdminLayout";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/dang-nhap" />} />
          {WebRoutes.map((route, i) => {
            let Layout = DefaultLayout;
            let Pages = route.component;
            return (
              <Route
                index={i}
                path={route.path}
                element={
                  <Layout>
                    <Pages />
                  </Layout>
                }
              />
            );
          })}


          <Route path="/" element={<Navigate to="/dang-nhap" />} />
          {AdminRoutes.map((route, i) => {
            let Layout =AdminLayout;
            let Pages = route.component;
            return (
              <Route
                index={i}
                path={route.path}
                element={
                  <Layout>
                    <Pages />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
