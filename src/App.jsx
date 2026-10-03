import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Business from "./pages/Business";
import Download from "./pages/Download";
import Help from "./pages/Help";
import Pay from "./pages/Pay";
import NotFound from "./pages/NotFound";
import CheckoutPage from "./pages/Checkout";
/* import ProcessPaymentPage from "./Pages/ProcessPayment"; */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/business"
          element={<Business />}
        />

        <Route
          path="/download"
          element={<Download />}
        />

        <Route
          path="/help"
          element={<Help />}
        />

        {/* Public customer payment page */}
        <Route
          path="/pay/:id"
          element={<Pay />}
        />

        <Route
        path="/checkout/:checkoutId"
        element={<CheckoutPage />}
      />

    {/*     <Route
            path="/process-payment/:checkoutId"
            element={<ProcessPaymentPage />}
             /> */}

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;