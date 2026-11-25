
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Cases from "./pages/Cases";
import Hearings from "./pages/Hearings";
import Notices from "./pages/Notices";
import Documents from "./pages/Documents";
import Appeals from "./pages/Appeals";
import Payments from "./pages/Payments";
import Notifications from "./pages/Notifications";
import Reports from "./pages/Reports";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <div className="main">
          <Header />

          <main className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/hearings" element={<Hearings />} />
              <Route path="/notices" element={<Notices />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/appeals" element={<Appeals />} />
              <Route path="/payments" element={<Payments />} />
              <Route
                path="/notifications"
                element={<Notifications />}
              />
              <Route path="/reports" element={<Reports />} />

              <Route path="*" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
