import { useState, useEffect } from "react";

const useLoginAttempts = () => {
  const [loginAttempts, setLoginAttempts] = useState({});

  useEffect(() => {
    const loginAttemptsInStorage = localStorage.getItem("loginAttempts");
    if (loginAttemptsInStorage && Object.keys(loginAttempts).length === 0) {
      const loginAttemptsJson = JSON.parse(loginAttemptsInStorage);
      setLoginAttempts(loginAttemptsJson);
    }
  });

  const getLoginAttempts = (username) => {
    return loginAttempts[username] ? loginAttempts[username] : 0;
  };

  const incrementLoginAttempts = (username) => {
    const incrementedLoginAttempt = loginAttempts[username] ? loginAttempts[username] + 1 : 1;
    const newLoginAttemptsObject = { ...loginAttempts, [username]: incrementedLoginAttempt };
    setLoginAttempts({ ...newLoginAttemptsObject });
    localStorage.setItem("loginAttempts", JSON.stringify({ ...loginAttempts, [username]: ++loginAttempts[username] }));
  };

  const resetLoginAttempts = (username) => {
    const newLoginAttemptsObject = { ...loginAttempts, [username]: 0 };
    setLoginAttempts({ ...newLoginAttemptsObject });
    localStorage.setItem("loginAttempts", JSON.stringify(newLoginAttemptsObject));
  };

  return {
    getLoginAttempts,
    incrementLoginAttempts,
    resetLoginAttempts,
  };
};

export default useLoginAttempts;
