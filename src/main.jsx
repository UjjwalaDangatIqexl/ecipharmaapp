import React, { Suspense } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import "../src/App.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from "./Redux/store/store.jsx";
import ThemeProvider from "./theme/index.jsx";
import { Provider } from "react-redux";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import Loader from "./components/common/Loader.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<Loader isLoading={true} />}>
      <ThemeProvider>
        <Router>
          <Provider store={store}>
            <ToastContainer
              position="top-right"
              autoClose={1000}
              closeButton={true}
              hideProgressBar={true}
              newestOnTop={false}
              rtl={false}
              limit={1}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Slide}
            />
            <CssBaseline />
            <App />
          </Provider>
        </Router>
      </ThemeProvider>
    </Suspense>
  </React.StrictMode>
);
