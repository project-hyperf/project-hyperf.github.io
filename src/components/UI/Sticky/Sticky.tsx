import { useInView } from "framer-motion";
import { PropsWithChildren, useRef } from "react";

interface StickyProps {
  className?: string;
  scrollRef?: Element;
}

export const Sticky: React.FC<PropsWithChildren<StickyProps>> = ({
  children,
  className,
  scrollRef = document.body,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const elementRef = useRef<Element>(scrollRef ?? null);
  const isInView = useInView(ref, {
    root: elementRef,
    amount: "all",
  });
  const isSticky = !isInView;
  return (
    <>
      <div
        ref={ref}
        style={{
          all: "unset",
          visibility: isSticky ? "hidden" : "visible",
        }}
      >
        {children}
      </div>
      {isSticky && (
        <div
          className={className}
          style={{
            position: "fixed",
            visibility: !isSticky ? "hidden" : "visible",
            zIndex: 10,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};
