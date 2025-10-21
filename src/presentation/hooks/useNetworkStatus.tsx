import { useEffect, useState } from "react";

const useNetworkStatus = () => {
  const [isOnline, setOnline] = useState<boolean>(
    typeof window !== 'undefined' ? window.navigator.onLine : true
  );

  const updateNetworkStatus = () => {
    if (typeof window !== 'undefined') {
        setOnline(window.navigator.onLine);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
        updateNetworkStatus();
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
        return; 
    }
    
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);
    

    return () => {
        window.removeEventListener("online", updateNetworkStatus);
        window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);
  return { isOnline };
};

export default useNetworkStatus;