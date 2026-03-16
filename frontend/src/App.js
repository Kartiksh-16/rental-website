import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home           from "./pages/Home";
import AddProperty    from "./pages/AddProperty";
import Login          from "./pages/Login";
import AboutUs        from "./pages/AboutUs";
import Blog           from "./pages/Blog";
import Contact        from "./pages/Contact";
import PropertyDetail from "./pages/PropertyDetail";
import SavedProperties from "./pages/SavedProperties";
import ManageListings  from "./pages/ManageListings";
import Messages        from "./pages/Messages";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                      element={<Home />}            />
        <Route path="/add"                   element={<AddProperty />}     />
        <Route path="/login"                 element={<Login />}           />
        <Route path="/about"                 element={<AboutUs />}         />
        <Route path="/blog"                  element={<Blog />}            />
        <Route path="/contact"               element={<Contact />}         />
        <Route path="/property/:id"          element={<PropertyDetail />}  />
        <Route path="/dashboard/saved"       element={<SavedProperties />} />
        <Route path="/dashboard/listings"    element={<ManageListings />}  />
        <Route path="/dashboard/messages"    element={<Messages />}        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
