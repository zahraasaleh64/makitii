import { Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import VendorLayout from './layouts/VendorLayout'
import AdminLayout from './layouts/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Stores from './pages/Stores'
import StoreDetail from './pages/StoreDetail'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'

import VendorDashboard from './pages/vendor/VendorDashboard'
import VendorStoreProfile from './pages/vendor/VendorStoreProfile'
import VendorProducts from './pages/vendor/VendorProducts'
import VendorProductForm from './pages/vendor/VendorProductForm'
import VendorJobs from './pages/vendor/VendorJobs'
import VendorJobForm from './pages/vendor/VendorJobForm'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminStores from './pages/admin/AdminStores'
import AdminCategories from './pages/admin/AdminCategories'
import AdminProducts from './pages/admin/AdminProducts'

export default function App() {
  return (
    <>
      <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/boutiques" element={<Stores />} />
        <Route path="/boutiques/:slug" element={<StoreDetail />} />
        <Route path="/produits" element={<Products />} />
        <Route path="/produits/:id" element={<ProductDetail />} />
        <Route path="/emplois" element={<Jobs />} />
        <Route path="/emplois/:id" element={<JobDetail />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contactez-nous" element={<Contact />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/devenir-vendeur" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<ProtectedRoute role="vendor" />}>
        <Route element={<VendorLayout />}>
          <Route path="/tableau-de-bord" element={<VendorDashboard />} />
          <Route path="/tableau-de-bord/boutique" element={<VendorStoreProfile />} />
          <Route path="/tableau-de-bord/produits" element={<VendorProducts />} />
          <Route path="/tableau-de-bord/produits/nouveau" element={<VendorProductForm />} />
          <Route path="/tableau-de-bord/produits/:id/modifier" element={<VendorProductForm />} />
          <Route path="/tableau-de-bord/emplois" element={<VendorJobs />} />
          <Route path="/tableau-de-bord/emplois/nouveau" element={<VendorJobForm />} />
          <Route path="/tableau-de-bord/emplois/:id/modifier" element={<VendorJobForm />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="admin" />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/boutiques" element={<AdminStores />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/produits" element={<AdminProducts />} />
        </Route>
      </Route>
    </Routes>
    </>
  )
}
