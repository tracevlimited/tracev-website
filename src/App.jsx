import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Pages/Home";
import Business from "./Pages/Business";
import Download from "./Pages/Download";
import Help from "./Pages/Help";
import Pay from "./Pages/Pay";
import NotFound from "./Pages/NotFound";
import CheckoutPage from "./Pages/Checkout";
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