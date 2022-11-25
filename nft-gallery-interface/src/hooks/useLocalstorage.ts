import { useCallback, useEffect, useState } from "react";


export const useLocalStorage = <T>(key: string, initialValue: T) => {

    const [storedValue, setStoredValue] = useState<T>(() => {
    
        try {
    
        const item = window.localStorage.getItem(key);
    
        return item ? JSON.parse(item) : initialValue;
    
        } catch (error) {
    
        console.log(error);
    
        return initialValue;
    
        }
    
    });
    
    const setValue = useCallback((value: T) => {
    
        try {
    
        const valueToStore =
    
            value instanceof Function ? value(storedValue) : value;
    
        setStoredValue(valueToStore);
    
        window.localStorage.setItem(key, JSON.stringify(valueToStore));

        } catch (error) {
            
        console.log(error);
    
        }

    },[key, storedValue]);

  


    return [storedValue, setValue] as const;

};