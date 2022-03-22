import { useEffect, useState } from "react"

const useDebounce = (initalValue = '', delay = 1000) => {
    const [state, setState] = useState(initalValue);
    useEffect(() => {
        const timer = setTimeout(() => {
            setState(initalValue);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay, initalValue])
    return state;
}
export default useDebounce;