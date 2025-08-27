import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";           // default vite css
import "./styles/styles.css";   // ✅ correct path

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
