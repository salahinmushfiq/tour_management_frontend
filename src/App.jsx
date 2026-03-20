//src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import TouristLayout from './layouts/TouristLayout';
import OrganizerLayout from './layouts/OrganizerLayout';
import AdminLayout from './layouts/AdminLayout';
import GuideLayout from './layouts/GuideLayout';
import ProtectedRoute from './components/ProtectedRoute';


import { Login, Register, PasswordResetConfirm, PasswordResetRequest,
  LandingPage, Unauthorized, OrganizerHome, TouristHome, AdminHome, TourDetails,
  ViewProfile, EditProfile, TourEdit, TourCreate, Tours, GuideHome, GuideAssignments,
  ManageUsers, TourDetail, OrganizerBookings, AdminBookings, PaymentSuccess,
  PaymentFailure, PaymentCancelled, PaymentProcessing} from './pages';
import AppProviders from './providers/AppProviders';

export default function App() {

  return (
    <AppProviders>
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
            <Route path="events/:id" element={<TourDetail />} /> {/* Optional event details */}
            <Route path="profile" element={<ViewProfile />} />
            <Route path="profile/edit" element={<EditProfile />} />
            <Route path="payment/success" element={<PaymentSuccess />} />
            <Route path="payment/failure" element={<PaymentFailure />} />
            <Route path="payment/cancelled" element={<PaymentCancelled />} />
            <Route path="payment/processing" element={<PaymentProcessing />} />
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
                
                  <OrganizerLayout />
                
              </>
            }
          >
            <Route index element={<OrganizerHome />} />
            <Route path="tours" element={<Tours/>} />
            <Route path="bookings" element={<OrganizerBookings/>} />
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
                  <AdminLayout />
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
            
            <Route path="bookings" element={<AdminBookings/>} />
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
                {/* if your guide dashboard uses sidebar */}
                  <GuideLayout />
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
    </AppProviders>
  );
}
