import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StaffProvider, useStaffRole } from "./context/StaffContext";
import StaffLayout from "./components/layout/StaffLayout";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import OpsOrderQueuePage from "./pages/ops/OpsOrderQueuePage";
import TicketQueuePage from "./pages/support/TicketQueuePage";
import VendorTicketsPage from "./pages/support/VendorTicketsPage";
import RefundQueuePage from "./pages/finance/RefundQueuePage";
import LedgerViewPage from "./pages/finance/LedgerViewPage";
import PayoutAssistPage from "./pages/finance/PayoutAssistPage";
import CampaignsPage from "./pages/marketing/CampaignsPage";

const StaffRoutes = () => {
  const { isAuthenticated } = useStaffRole();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <StaffLayout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="ops/orders" element={<OpsOrderQueuePage />} />
          <Route path="support/tickets" element={<TicketQueuePage />} />
          <Route path="support/vendor-tickets" element={<VendorTicketsPage />} />
          <Route path="finance/refunds" element={<RefundQueuePage />} />
          <Route path="finance/ledger" element={<LedgerViewPage />} />
          <Route path="finance/payouts" element={<PayoutAssistPage />} />
          <Route path="marketing/campaigns" element={<CampaignsPage />} />
        </Route>
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <StaffProvider>
    <StaffRoutes />
  </StaffProvider>
);

export default App;
