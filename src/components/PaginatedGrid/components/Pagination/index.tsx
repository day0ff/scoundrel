import {useEffect, useRef, useState, type FC} from "react";
import {useButtonSounds} from "hooks/useButtonSounds.ts";
import {PaginationStyled, PageButton, PaginationButton, PageIndicesStyled} from "./styles.ts";
import {PaginatedGridPropsType} from "./types.ts";

export const Pagination:FC<PaginatedGridPropsType> = (
    {
        className,
        numberOfItems,
        rowSize,
        columnSize,
        page,
        setPage
    }
) => {
    const sounds = useButtonSounds<HTMLButtonElement>();
    const itemsPerPage = rowSize * columnSize;
    const totalPages = Math.ceil(numberOfItems / itemsPerPage);
    const indicesRef = useRef<HTMLDivElement>(null);
    const currentIndexRef = useRef<HTMLButtonElement>(null);
    const [fades, setFades] = useState({left: false, right: false});

    useEffect(() => {
        const indices = indicesRef.current;
        const currentIndex = currentIndexRef.current;
        if (!indices || !currentIndex) return;

        const updateFades = () => {
            const left = indices.scrollLeft > 1;
            const right = indices.scrollWidth - indices.clientWidth - indices.scrollLeft > 1;
            setFades(previous => previous.left === left && previous.right === right
                ? previous : {left, right});
        };

        const scrollToCurrentIndex = () => {
            if (!indices.clientWidth) return;
            const indicesBounds = indices.getBoundingClientRect();
            const currentBounds = currentIndex.getBoundingClientRect();
            indices.scrollTo({
                left: indices.scrollLeft + currentBounds.left - indicesBounds.left
                    - indices.clientLeft - (indices.clientWidth - currentBounds.width) / 2,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            });
            updateFades();
        };

        indices.addEventListener("scroll", updateFades, {passive: true});
        scrollToCurrentIndex();
        const observer = new ResizeObserver(scrollToCurrentIndex);
        observer.observe(indices);
        observer.observe(currentIndex);
        return () => {
            observer.disconnect();
            indices.removeEventListener("scroll", updateFades);
        };
    }, [page, totalPages]);

    return totalPages > 1 ? (
        <PaginationStyled className={className}>
            <PaginationButton disabled={page === 1} onMouseEnter={sounds.onMouseEnter} onMouseLeave={sounds.onMouseLeave} onFocus={sounds.onFocus} onClick={event => {
                sounds.onClick(event);
                setPage((p: number) => p - 1);
            }}>
                ◀
            </PaginationButton>
            <PageIndicesStyled ref={indicesRef} $fadeLeft={fades.left} $fadeRight={fades.right}>
                {Array.from({length: totalPages}, (_, i) => (
                    <PageButton
                        key={i}
                        ref={page === i + 1 ? currentIndexRef : undefined}
                        aria-current={page === i + 1 ? "page" : undefined}
                        $active={page === i + 1}
                        onMouseEnter={sounds.onMouseEnter} onMouseLeave={sounds.onMouseLeave} onFocus={sounds.onFocus} onClick={event => {
                            sounds.onClick(event);
                            setPage(i + 1);
                        }}
                    >
                        {i + 1}
                    </PageButton>
                ))}
            </PageIndicesStyled>
            <PaginationButton
                disabled={page === totalPages}
                onMouseEnter={sounds.onMouseEnter} onMouseLeave={sounds.onMouseLeave} onFocus={sounds.onFocus} onClick={event => {
                    sounds.onClick(event);
                    setPage((p: number) => p + 1);
                }}
            >
                ▶
            </PaginationButton>
        </PaginationStyled>
    ) : null;
}

export default Pagination;
