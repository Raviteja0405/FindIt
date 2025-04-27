import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
// import LostItems from "./pages/LostItems";
// import FoundItems from "./pages/FoundItems";
// import ReportItem from "./pages/ReportItem";
// import MyPosts from "./pages/MyPosts";

const App = () => {
  const [darkmode, setDarkmode] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home darkmode={darkmode} setDarkmode={setDarkmode} />} />
        {/* <Route path="/lost-items" element={<LostItems darkmode={darkmode} setDarkmode={setDarkmode} />} />
        <Route path="/found-items" element={<FoundItems darkmode={darkmode} setDarkmode={setDarkmode} />} />
        <Route path="/report-item" element={<ReportItem darkmode={darkmode} setDarkmode={setDarkmode} />} />
        <Route path="/my-posts" element={<MyPosts darkmode={darkmode} setDarkmode={setDarkmode} />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
