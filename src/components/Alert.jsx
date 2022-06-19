import { useState, useEffect } from "react";
import AnimatedPage from "./AnimatedPage";

const AlertMessage = ({ status, message }) => {
  const [alert, setAlert] = useState(
    <AnimatedPage>
      <div
        className={`alert-message ${status === "success" ? "success" : "fail"}`}
      >
        {status === "success" ? (
          <svg
            width="16px"
            height="16px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            color="#0ACF83"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path>
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color="#ff0000"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        )}

        <span>
          <h2>{status === "success" ? "Yay!" : "Oops!"}</h2>
          <p>{message}</p>
        </span>
        <svg
          onClick={() => setAlert(null)}
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          color="#4A5568"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
    </AnimatedPage>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(null);
    }, 60000);
    return () => clearTimeout(timer);
  });

  return alert;
};

export default AlertMessage;
