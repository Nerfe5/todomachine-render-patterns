import React from 'react';

function useLocalStorage(itemName, initialValue) {
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const initialValueRef = React.useRef(initialValue);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValueRef.current));
          parsedItem = initialValueRef.current;
        } else {
          parsedItem = JSON.parse(localStorageItem);
          setItem(parsedItem);
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    }, 2000);
  }, [itemName]);

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return { item, saveItem, loading, error };
}

export { useLocalStorage };
