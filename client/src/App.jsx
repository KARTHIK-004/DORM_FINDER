import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import AgentDashboard from "./pages/dashboard/agent/AgentDashboard";
import StudentDashboard from "./pages/dashboard/student/StudentDashboard";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import Dashboard from "./pages/dashboard/agent/Dashboard";
import AgentProfile from "./pages/dashboard/agent/AgentProfile";
import Bookings from "./pages/dashboard/agent/AgentBooking";
import Reviews from "./pages/dashboard/agent/Reviews";
import ManageListings from "./pages/dashboard/agent/ManageListings";
import CreateListings from "./pages/dashboard/agent/CreateListings";
import ViewListing from "./pages/dashboard/agent/ViewListing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
          <Route path="/agent" element={<AgentDashboard />}>
            {/* Nested Routes */}
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<AgentProfile />} />
            <Route
              path="manage-listings/create-listings"
              element={<CreateListings />}
            />
            <Route path="manage-listings" element={<ManageListings />} />
            <Route path="listings/:id" element={<ViewListing />} />
            <Route path="view-listings" element={<ViewListing />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="/student/dashboard" element={<StudentDashboard />}>
            {/* Nested Routes */}
            <Route index element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
