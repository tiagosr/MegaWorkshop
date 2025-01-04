import { useLayoutEffect, useRef } from "react";

function useResizeObserver<T extends HTMLElement>(
    callback: (target: T, entry: ResizeObserverEntry) => void
) {
    const targetRef = useRef<T | null>(null);
    useLayoutEffect(() => {
        if (targetRef.current) {
        const observer = new ResizeObserver((entries) => {
            callback(targetRef.current!, entries[0]);
        });
        observer.observe(targetRef.current);
        return () => observer.disconnect();
        }
    }, [callback, targetRef]);

  return targetRef;
}

export default useResizeObserver;