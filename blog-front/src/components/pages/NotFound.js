import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          color: "#333",
          textShadow: "1px 1px #fff",
          textAlign: "center",
        }}
      >
        Oops!
      </h1>
      <div
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "#333",
          borderRadius: "50%",
          margin: "0 1rem",
        }}
      ></div>
      <h2
        style={{
          fontSize: "2rem",
          color: "#333",
          textShadow: "1px 1px #fff",
          textAlign: "center",
        }}
      >
        Page Not Found
      </h2>
    </div>
  );
}
