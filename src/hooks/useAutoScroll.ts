import { useEffect, type RefObject } from "react";

/**
 * Automatically scrolls a container to the top when a trigger value changes.
 * Originally designed for Radix UI ScrollArea, but adaptable.
 * 
 * @param ref - Ref to the scroll container or parent of viewport
 * @param trigger - The value that triggers the scroll (e.g., ID change)
 * @param selector - Optional selector for a child viewport (default for Radix ScrollArea)
 */
export function useAutoScroll<T extends HTMLElement>(
    ref: RefObject<T | null>,
    trigger: unknown,
    selector: string = '[data-radix-scroll-area-viewport]'
) {
    useEffect(() => {
        if (trigger && ref.current) {
            const target = ref.current.querySelector(selector) || ref.current;
            target.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [trigger, ref, selector]);
}
