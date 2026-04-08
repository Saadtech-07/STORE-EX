import { useState, useEffect } from "react";

/**
 * Custom Hook: useLocalStorage
 * Syncs state with browser's localStorage automatically
 * 
@param {string} key 
 @param {any} initialValue 
 @returns {[any, function]} 
 */
function useLocalStorage(key, initialValue) {

  const [storedValue, setStoredValue] = useState(() => {
    try {

      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {

      const valueToStore =
        value instanceof Function ? value(storedValue) : value;


      setStoredValue(valueToStore);

      if (valueToStore === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };


  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error syncing localStorage key "${key}":`, error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
