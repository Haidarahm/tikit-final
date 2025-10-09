import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./store/ThemeContext.jsx";
import Navbar from "./components/Navbar";
import DarkBackground from "./components/DarkBackground";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import AOSRefresher from "./components/AOSRefresher";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LogoIntro from "./components/LogoIntro";
import TickLoader from "./components/TickLoader";

// Lazy load components
const Home = lazy(() => import("./pages/Home/Home"));
const ServiceDetails = lazy(() =>
  import("./pages/service-details/ServiceDetails")
);
const Details = lazy(() => import("./pages/details/Details"));
const Work = lazy(() => import("./pages/Work/Work"));
const AboutUs = lazy(() => import("./pages/about/AboutUs"));
const Services = lazy(() => import("./pages/services/Services"));
const Contact = lazy(() => import("./pages/contact/Contact"));

// Loading component
const LoadingSpinner = () => <TickLoader />;

const Layout = () => (
 <>
 <ScrollToTop />
    <AOSRefresher />
    <div className="relative w-full">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
 </>
    
);

function App() {
  useEffect(() => {
    AOS.init({ once: false, duration: 700 });
  }, []);
  return (
    <ThemeProvider>
      {/* LogoIntro rendered outside Suspense */}
      <Routes>
        <Route path="/" element={<LogoIntro />} />
      </Routes>
      {/* Lazy-loaded routes inside Suspense */}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/service-details/:id" element={<ServiceDetails />} />
          </Route>
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
