import React, { useState, useEffect } from "react";

export const OnlineContext = React.createContext({
  isOnline: window.navigator.onLine,
});

const OnlineContextProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    if (window.navigator && window.navigator.onLine) {
      setIsOnline(window.navigator.onLine);

      window.addEventListener("online", onNetworkStatusChange);
      window.addEventListener("offline", onNetworkStatusChange);

      return () => {
        window.removeEventListener("online", onNetworkStatusChange);
        window.removeEventListener("offline", onNetworkStatusChange);
      };
    }
  }, []);

  const onNetworkStatusChange = (event) => {
    setIsOnline(event.type === "online");
  };

  return (
    <OnlineContext.Provider value={{ isOnline }}>
      {children}
    </OnlineContext.Provider>
  );
};

export default OnlineContextProvider;
