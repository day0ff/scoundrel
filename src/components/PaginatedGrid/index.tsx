import {useEffect, useLayoutEffect, useState} from "react";
import {chunkArray} from "helpers";
import {useAssignedNode} from "hooks";
import Pagination from "./components/Pagination";
import {DEFAULT_EMPTY_ITEM_SIZE, ITEM_ANIMATION_DURATION_MS, ITEM_ANIMATION_STAGGER_MS} from "./constants.ts";
import {GridViewportStyled, ItemWrapper, Raw, RowsStyled, Wrapper} from "./styles.ts";
import {GridAnimationPhaseType, PaginatedGridPropsType} from "./types.ts";

export function PaginatedGrid<T extends { id: string }>(
    {
        className,
        items,
        rowSize,
        columnSize,
        ratio = -0.5,
        offset = 2,
        gap = 16,
        reserveEmptySpace = false,
        emptyItemSize = DEFAULT_EMPTY_ITEM_SIZE,
        ItemComponent,
        onPush,
    }: PaginatedGridPropsType<T>
) {
    const [page, setPage] = useState(1);
    const [displayedPage, setDisplayedPage] = useState(1);
    const [animationPhase, setAnimationPhase] = useState<GridAnimationPhaseType>("idle");
    const [refAppend, nodeAppend] = useAssignedNode<HTMLDivElement>();
    const [refItem, nodeItem] = useAssignedNode<HTMLSpanElement>();
    const [itemSize, setItemSize] = useState<{width: number; height: number}>();
    const [refRows, nodeRows] = useAssignedNode<HTMLDivElement>();
    const [gridSize, setGridSize] = useState<{width: number; height: number}>();

    useLayoutEffect(() => {
        if (!nodeRows) return;

        const updateSize = () => {
            // Closed dialogs have no layout box; keep the last visible dimensions.
            if (!nodeRows.getClientRects().length) return;
            let naturalWidth = 0;
            for (const row of nodeRows.children) {
                if (!(row instanceof HTMLElement)) continue;
                const items = Array.from(row.children).filter((item): item is HTMLElement => item instanceof HTMLElement);
                const totalWidth = items.reduce((width, item) => width + item.offsetWidth, 0);
                naturalWidth = Math.max(naturalWidth, totalWidth + gap * Math.max(0, items.length - 1));
                const overlap = items.length > 1
                    ? Math.max(0, (totalWidth + gap * (items.length - 1) - row.clientWidth) / (items.length - 1))
                    : 0;
                row.style.setProperty("--item-overlap", `${overlap}px`);
            }
            // Keep the preferred width independent of overlap so cards spread out again when space returns.
            const firstItem = nodeRows.firstElementChild?.firstElementChild;
            const reservedWidth = reserveEmptySpace
                ? (firstItem instanceof HTMLElement ? firstItem.offsetWidth : emptyItemSize.width) * columnSize
                    + gap * Math.max(0, columnSize - 1)
                : 0;
            const width = Math.max(naturalWidth, reservedWidth);
            const height = nodeRows.offsetHeight;
            setGridSize(previous => previous?.width === width && previous.height === height
                ? previous : {width, height});
        };
        updateSize();
        const observer = new ResizeObserver(updateSize);
        observer.observe(nodeRows);
        for (const row of nodeRows.children) {
            observer.observe(row);
            for (const item of row.children) observer.observe(item);
        }
        return () => observer.disconnect();
    }, [nodeRows, displayedPage, items, gap, columnSize, reserveEmptySpace, emptyItemSize.width]);

    useEffect(() => {
        if (!reserveEmptySpace || !nodeItem) return;

        const observer = new ResizeObserver(([entry]) => {
            const {width, height} = entry.contentRect;
            if (width <= 0 || height <= 0) return;
            setItemSize(previous => previous?.width === width && previous.height === height
                ? previous : {width, height});
        });
        observer.observe(nodeItem);
        return () => observer.disconnect();
    }, [reserveEmptySpace, nodeItem]);

    const itemsPerPage = rowSize * columnSize;

    const startIndex = (displayedPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);
    const currentItemCount = currentItems.length;

    useEffect(() => {
        if (page === displayedPage) {
            setAnimationPhase(previous => previous === "exiting" ? "idle" : previous);
            return;
        }
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !currentItemCount) {
            setDisplayedPage(page);
            setAnimationPhase("idle");
            return;
        }

        setAnimationPhase("exiting");
        // Replace the page only after its last item has finished hiding.
        const timer = setTimeout(() => {
            setDisplayedPage(page);
            setAnimationPhase("entering");
        }, ITEM_ANIMATION_DURATION_MS + (currentItemCount - 1) * ITEM_ANIMATION_STAGGER_MS);
        return () => clearTimeout(timer);
    }, [page, displayedPage, currentItemCount]);

    useEffect(() => {
        if (animationPhase !== "entering") return;
        const timer = setTimeout(() => setAnimationPhase("idle"),
            ITEM_ANIMATION_DURATION_MS + Math.max(0, currentItemCount - 1) * ITEM_ANIMATION_STAGGER_MS);
        return () => clearTimeout(timer);
    }, [animationPhase, currentItemCount]);

    const chunks = chunkArray(currentItems, columnSize);
    const reservedItemSize = currentItemCount > 0 ? itemSize ?? emptyItemSize : emptyItemSize;
    const reservedSize = reserveEmptySpace && reservedItemSize ? {
        minWidth: `min(100%, ${reservedItemSize.width * columnSize + gap * Math.max(0, columnSize - 1)}px)`,
        minHeight: reservedItemSize.height * rowSize + gap * Math.max(0, rowSize - 1),
    } : undefined;

    return (
        <Wrapper ref={refAppend} className={className} style={{gap}}>
            <GridViewportStyled style={gridSize}>
            <RowsStyled ref={refRows} style={{gap, ...reservedSize}} inert={animationPhase !== "idle"} aria-busy={animationPhase !== "idle"}>
            {chunks.map((chunk, rawIndex) => (
                <Raw key={rawIndex} style={{gap}}>
                    {chunk.map((item, itemIndex) => {
                        const correctedIndex = chunk.length % 2 === 0 && itemIndex >= Math.floor(chunk.length / 2) ? itemIndex + 1 : itemIndex;
                        const spread = Math.floor(chunk.length / 2) - correctedIndex;
                        return (
                            <ItemWrapper key={JSON.stringify([item.id ?? ("identifier" in item ? String(item.identifier) : null), startIndex + rawIndex * columnSize + itemIndex])}
                                         $phase={animationPhase} $index={rawIndex * columnSize + itemIndex}
                                         ref={rawIndex === 0 && itemIndex === 0 ? refItem : undefined}
                                         style={{transform: `rotate(calc(${ratio}deg * ${spread})) translateY(calc(${offset}px * ${Math.abs(spread)}))`}}>
                                <ItemComponent {...item} appendTo={nodeAppend} onPush={onPush}/>
                            </ItemWrapper>
                        )
                    })}
                </Raw>
            ))}
            </RowsStyled>
            </GridViewportStyled>
            <Pagination
                numberOfItems={items.length}
                columnSize={columnSize}
                rowSize={rowSize}
                page={page}
                setPage={setPage}
            />
        </Wrapper>
    );
}

export default PaginatedGrid;
