import React, { useState, useEffect } from "react";

const Clock = ({ handleLogout }) => {
  const [minutes, setMinutes] = useState(59);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          handleLogout(); // Logout when timer expires
          clearInterval(interval);
        } else {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [handleLogout, minutes, seconds]);

  return (
    <div style={{ color: "#fff", fontWeight: 600, margin: 0 }}>
      <p style={{ margin: 0 }}>
        Session Timer:
        {`    ${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`}
      </p>
    </div>
  );
};

export default Clock;
