import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { AuthProvider } from './context/AuthContext';
import PasswordResetConfirm from './pages/auth/PasswordResetConfirm';
import PasswordResetRequest from './pages/auth/PasswordResetRequest';
import LandingPage from './pages/LandingPage';
import Unauthorized from './pages/Unauthorized';
import TouristLayout from './layouts/TouristLayout';
import OrganizerLayout from './layouts/OrganizerLayout';
import OrganizerHome from './pages/dashboard/organizer/OrganizerHome';
import TouristHome from './pages/dashboard/tourist/TouristHome';
import Events from './pages/dashboard/tourist/Events';
import { SidebarProvider } from './context/SidebarContext';
import SessionModal from './components/SessionModal';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AdminLayout from './layouts/AdminLayout';
import AdminHome from './pages/dashboard/admin/AdminHome';

import TourDetails from './pages/dashboard/shared/pages/TourDetails';
import ViewProfile from './pages/dashboard/shared/pages/ViewProfile';
import EditProfile from './pages/dashboard/admin/EditProfile';

import TourEdit from './pages/dashboard/shared/pages/TourEdit';
import TourCreate from './pages/dashboard/shared/pages/TourCreate';
import Tours from './pages/dashboard/shared/pages/Tours';
import GuideLayout from './layouts/GuideLayout';
import GuideHome from './pages/dashboard/guide/GuideHome';
import GuideAssignments from './pages/dashboard/guide/GuideAssignments';
import ManageUsers from './pages/dashboard/admin/ManageUsers';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <SessionModal />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Helmet>
                <title>TourMate - Home</title>
                <meta name="description" content="Explore tours and travel experiences." />
              </Helmet>
              <LandingPage />
            </>
          } />

          <Route path="/login" element={
            <>
              <Helmet><title>Login - TourMate</title></Helmet>
              <Login />
            </>
          } />

          <Route path="/register" element={
            <>
              <Helmet><title>Register - TourMate</title></Helmet>
              <Register />
            </>
          } />

          <Route path="/password-reset" element={
            <>
              <Helmet><title>Reset Password - TourMate</title></Helmet>
              <PasswordResetRequest />
            </>
          } />

          <Route path="/password-reset-confirm/:uid/:token" element={
            <>
              <Helmet><title>Confirm Reset - TourMate</title></Helmet>
              <PasswordResetConfirm />
            </>
          } />

          <Route path="/unauthorized" element={
            <>
              <Helmet><title>Unauthorized - TourMate</title></Helmet>
              <Unauthorized />
            </>
          } />

          {/* Tourist Dashboard Routes */}
          <Route element={<ProtectedRoute allowedRoles={['tourist']} />}>
            <Route
              path="/dashboard/tourist"
              element={
                <>
                  <Helmet>
                    <meta name="robots" content="noindex, nofollow" />
                    <title>Tourist Dashboard - TourMate</title>
                  </Helmet>
                  <TouristLayout /> {/* Layout with <Outlet /> */}
                </>
              }
            >
              {/* Nested routes inside the layout */}
              <Route index element={<TouristHome />} /> {/* Default dashboard page */}
              <Route path="events" element={<Events />} /> {/* Tourist events page */}
              <Route path="events/:id" element={<TourDetails />} /> {/* Optional event details */}
              <Route path="profile" element={<ViewProfile />} />
              <Route path="profile/edit" element={<EditProfile />} />
            </Route>
          </Route>


          {/* Organizer Dashboard Routes */}
          <Route element={<ProtectedRoute allowedRoles={['organizer']} />}>
            <Route
              path="/dashboard/organizer"
              element={
                <>
                  <Helmet>
                    <meta name="robots" content="noindex, nofollow" />
                    <title>Organizer Dashboard - TourMate</title>
                  </Helmet>
                  <SidebarProvider>
                    <OrganizerLayout />
                  </SidebarProvider>
                </>
              }
            >
              <Route index element={<OrganizerHome />} />
              <Route path="tours" element={<Tours/>} />
              <Route path="tours/create" element={<TourCreate />} />
              <Route path="tours/:id" element={<TourDetails />} />
              <Route path="tours/:id/edit" element={<TourEdit/>} />
              <Route path="profile" element={<ViewProfile />} />
              <Route path="profile/edit" element={<EditProfile />} />
            </Route>
          </Route>
          {/* Admin Dashboard Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route
              path="/dashboard/admin"
              element={
                <>
                  <Helmet>
                    <meta name="robots" content="noindex, nofollow" />
                    <title>Admin Dashboard - TourMate</title>
                  </Helmet>
                  <SidebarProvider>
                    <AdminLayout />
                  </SidebarProvider>
                </>
              }
            >
              {/* Default Admin Dashboard */}
              <Route index element={<AdminHome />} />

              <Route path="tours" element={<Tours/>} />
              <Route path="users" element={<ManageUsers/>} />
              
              <Route path="tours/create" element={<TourCreate />} />
              <Route path="tours/:id" element={<TourDetails />} />
              <Route path="tours/:id/edit" element={<TourEdit />} />
              <Route path="profile" element={<ViewProfile />} />
              <Route path="profile/edit" element={<EditProfile />} />
            </Route>
          </Route>
          {/* Guide Dashboard Routes */}
          <Route element={<ProtectedRoute allowedRoles={['guide']} />}>
            <Route
              path="/dashboard/guide"
              element={
                <>
                  <Helmet>
                    <meta name="robots" content="noindex, nofollow" />
                    <title>Guide Dashboard - TourMate</title>
                  </Helmet>
                  <SidebarProvider> {/* if your guide dashboard uses sidebar */}
                    <GuideLayout />
                  </SidebarProvider>
                </>
              }
            >
              <Route index element={<GuideHome />} />
              {/* Add other nested guide routes here, e.g. assignments, profile */}
              {/* <Route path="assignments" element={<GuideAssignments />} /> */}
              <Route path="profile" element={<ViewProfile />} />
              <Route path="assignments" element={<GuideAssignments />} />
              <Route path="tours" element={<Tours/>} />
              <Route path="tours/:id" element={<TourDetails />} />
              {/* <Route path="profile/edit" element={<EditProfile />} /> */}
            </Route>
          </Route>
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </HelmetProvider>
  );
}
