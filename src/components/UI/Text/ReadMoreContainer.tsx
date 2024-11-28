import { ScrollShadow } from "@nextui-org/react";
import classNames from "classnames";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { GeneralButton } from "../Button/GeneralButton";

interface ReadMoreContainerProps {
    className?: string;
    MoreButton?: React.FC<PropsWithChildren<{ onClick: () => void }>>;
}

export const ReadMoreContainer: React.FC<
    PropsWithChildren<ReadMoreContainerProps>
> = ({ children, className, MoreButton }) => {
    const [isOverflow, setIsOverflow] = useState(false);
    const [isExpended, setIsExpended] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const containerSize = containerRef.current?.clientHeight;
        const contentSize = contentRef.current?.clientHeight;

        if (containerSize && contentSize) {
            setIsOverflow(containerSize < contentSize);
        }
    }, [className, children]);

    const toggleExpended = () => setIsExpended((p) => !p);

    const ToggleButton = MoreButton ?? GeneralButton;

    return (
        <>
            <ScrollShadow
                ref={containerRef}
                className={classNames("overflow-hidden", className)}
                style={{
                    height: isExpended ? "auto" : undefined,
                    maxHeight: isExpended ? "unset" : undefined,
                }}
            >
                <div ref={contentRef}>{children}</div>
            </ScrollShadow>
            {(isOverflow || isExpended) && (
                <ToggleButton onClick={toggleExpended}>
                    {isExpended ? "접기" : "더보기"}
                </ToggleButton>
            )}
        </>
    );
};
