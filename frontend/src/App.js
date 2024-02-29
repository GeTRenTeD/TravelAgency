import React from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { useSelector } from "react-redux";

function App() {
  const { loading } = useSelector(state => state.alerts);
  
  return (
    <>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <Layout />
    </>
  );
}

export default App;