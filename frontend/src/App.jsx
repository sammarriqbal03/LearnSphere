import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import TeacherDashboardLayout from "./layouts/TeacherDashboardLayout";
import PageWrapper from "./components/PageWrapper";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Teachers from "./pages/Teachers";
import Pricing from "./pages/Pricing";
import Events from "./pages/Events";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Profile from "./pages/dashboard/Profile";
import MyCourses from "./pages/dashboard/MyCourses";
import Progress from "./pages/dashboard/Progress";
import Certificates from "./pages/dashboard/Certificates";
import Assignments from "./pages/dashboard/Assignments";
import Wishlist from "./pages/dashboard/Wishlist";
import Notifications from "./pages/dashboard/Notifications";
import DashboardSettings from "./pages/dashboard/DashboardSettings";

import TeacherProfile from "./pages/teacher/TeacherProfile";
import TeacherMyCourses from "./pages/teacher/TeacherMyCourses";
import AddCourse from "./pages/teacher/AddCourse";
import AddAssignment from "./pages/teacher/AddAssignment";
import Ratings from "./pages/teacher/Ratings";
import TeacherSettings from "./pages/teacher/TeacherSettings";
import TeacherWishlist from "./pages/teacher/TeacherWishlist"; // ✅ ADDED

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <PageWrapper>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="progress" element={<Progress />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>

          {/* Teacher Dashboard */}
          <Route
            path="/teacher-dashboard"
            element={
              <ProtectedRoute>
                <TeacherDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<TeacherProfile />} />
            <Route path="my-courses" element={<TeacherMyCourses />} />
            <Route path="add-course" element={<AddCourse />} />
            <Route path="add-assignment" element={<AddAssignment />} />
            <Route path="wishlist" element={<TeacherWishlist />} /> {/* ✅ ADDED */}
            <Route path="ratings" element={<Ratings />} />
            <Route path="settings" element={<TeacherSettings />} />
          </Route>
        </Routes>
      </PageWrapper>

      <Footer />
    </BrowserRouter>
  );
}

export default App;