import Navbar from './components/navbar';
import Home from './pages/Home';
import UserDashboard from './pages/userDashboard';
import UserProfile from './pages/userProfile/userProfile';
import UserRequests from './pages/userRequests';
import UserRequested from './pages/userRequested';
import Donation from './pages/Donation';
import Ai from './pages/Ai';
import AboutUs from './pages/AboutPage';
import LoginPage from './pages/Login';
import Contacts from './pages/ContactsPage.jsx';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import FindMedPage from './pages/findMedPage/FindMedPage.jsx';
import Footer from './components/Footer';
import GoogleCallback from './components/googleCallback';
import JoinUs from './pages/JoinUs';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import MedicineSearchResults from './pages/components_MedicineSearchResults';
import CircularUnderLoad from './components/CircularUnderLoad.jsx';
import PrescriptionImagePage from './pages/PrescriptionImagePage.jsx';
const Admin = lazy(()=>import('./pages/Admin.jsx'));


function App() {
  const location = useLocation();

  const hideNavbarRoutes = [
    '/login',
    '/forgotPassword',
    '/reset-password/:token',
    '/userDashboard',
    '/userProfile',
    '/userRequests',
    '/userRequested',
    '/admin/dashboard',
    '/admin/collection',
    '/admin/donation',
    '/admin/review',
    '/admin/accounts',
    '/admin/chat',
    '/auth/google/callback',
    '/prescriptionImage',
  ];

  const hideFooterRoutes = [
    '/login',
    '/forgotPassword',
    '/reset-password/:token',
    '/admin/dashboard',
    '/admin/collection',
    '/admin/donation',
    '/admin/review',
    '/admin/accounts',
    '/admin/chat',
    '/userDashboard',
    '/userProfile',
    '/userRequests', 
    '/userRequested',
    '/auth/google/callback',
    '/ai',
    '/prescriptionImage',
  ];

  return (
    <div className="App">
      {!hideNavbarRoutes.some(route => new RegExp(`^${route.replace(/:token/, ".*")}$`).test(location.pathname)) && <Navbar />}
      <Suspense fallback={<div className='circularunderload-container'><CircularUnderLoad/></div>}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/userRequests" element={<UserRequests />} />
          <Route path="/userRequested" element={<UserRequested />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/findMed" element={<FindMedPage />} />
          <Route path="/ai" element={<Ai />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contacts" element={<Contacts/>} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/airesult/*" element={< MedicineSearchResults />} />
          <Route path="/auth/google/callback" element={< GoogleCallback />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/joinUs" element={<JoinUs />} />
          <Route path="/prescriptionImage" element={<PrescriptionImagePage />} />
        </Routes>
      </Suspense>
      {!hideFooterRoutes.some(route => new RegExp(`^${route.replace(/:token/, ".*")}$`).test(location.pathname)) && <Footer />}
    </div>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
