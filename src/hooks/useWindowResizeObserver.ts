import {useState, useEffect} from 'react';

export const useWindowResizeObserver = () => {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        });
        observer.observe(document.documentElement);

        return () => observer.disconnect();
    }, []);

    return size;
}
