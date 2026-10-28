import {type FC, type KeyboardEvent, useLayoutEffect, useRef} from "react";
import {useTranslation} from "react-i18next";
import {getCollectionCard} from "entities/cards/helpers.ts";
import CardTooltipContent from "components/CardTooltipContent";
import TooltipContent from "components/TooltipContent";
import {VIEWPORT_TOOLTIP_POPPER_OPTIONS} from "components/Tooltip/constants.ts";
import {AppContainerStyled} from "styles/AppContainerStyled.ts";
import type {PackTabsPropsType} from "./types.ts";
import {TabsStyled, TabStyled, TabPackBoxStyled, TabTooltipStyled, TabTooltipReferenceStyled} from "./styles.ts";

const PackTabs: FC<PackTabsPropsType> = ({packs, selectedIdentifier, onSelect, label, idPrefix, panelId, size = "compact"}) => {
    const {t} = useTranslation();
    const tabs = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        const row = tabs.current;
        if (!row || size !== "full") return;
        const updateSpacing = () => {
            const items = Array.from(row.children).filter((item): item is HTMLElement => item instanceof HTMLElement);
            const style = getComputedStyle(row);
            const gap = parseFloat(style.columnGap) || 0;
            const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
            const naturalWidth = items.reduce((total, item) => total + item.offsetWidth, 0)
                + gap * Math.max(0, items.length - 1) + padding;
            // Preserve the preferred width so packs spread out again when space returns.
            row.style.width = `${naturalWidth}px`;
            const overlap = items.length > 1 ? Math.max(0, (naturalWidth - row.clientWidth) / (items.length - 1)) : 0;
            row.style.setProperty("--pack-overlap", `${overlap}px`);
        };
        updateSpacing();
        const observer = new ResizeObserver(updateSpacing);
        observer.observe(row);
        for (const item of row.children) observer.observe(item);
        return () => {
            observer.disconnect();
            row.style.removeProperty("width");
            row.style.removeProperty("--pack-overlap");
        };
    }, [packs, size]);
    const available = packs.filter(pack => !pack.isLocked && !pack.isNotFound);
    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, identifier: string) => {
        if (!available.length) return;
        const index = available.findIndex(pack => pack.identifier === identifier);
        let nextIndex: number;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % available.length;
        else if (event.key === "ArrowLeft") nextIndex = index < 0 ? available.length - 1 : (index + available.length - 1) % available.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = available.length - 1;
        else return;
        event.preventDefault();
        const next = available[nextIndex];
        onSelect(next.identifier);
        const button = tabs.current?.querySelectorAll<HTMLButtonElement>("button")[packs.indexOf(next)];
        button?.focus();
    };
    return (
        <TabsStyled $fullSize={size === "full"} ref={tabs} role={panelId ? "tablist" : "group"} aria-label={label}>
            {packs.map(pack => {
                const name = pack.isLocked ? "tag.collection.locked.name" : pack.isNotFound ? "tag.collection.notFound.name" : pack.name;
                const description = pack.isLocked ? pack.condition?.description ?? "tag.collection.locked.pack.description"
                    : pack.isNotFound ? "tag.collection.notFound.pack.description" : pack.description;
                return (
                    <TabTooltipStyled key={pack.identifier} $selected={selectedIdentifier === pack.identifier}
                        appendTo={reference => reference.closest(AppContainerStyled.toString()) ?? document.body}
                        trigger="mouseenter focusin" delay={[500, 500]} placement="auto"
                        popperOptions={VIEWPORT_TOOLTIP_POPPER_OPTIONS}
                        content={<CardTooltipContent name={name}><TooltipContent translationKey={description}/></CardTooltipContent>}>
                        <TabTooltipReferenceStyled>
                            <TabStyled type="button" id={`${idPrefix}-${pack.identifier}`} $color={pack.card.color ?? "black"}
                                role={panelId ? "tab" : undefined} aria-controls={panelId}
                                aria-selected={panelId ? selectedIdentifier === pack.identifier : undefined}
                                aria-pressed={panelId ? undefined : selectedIdentifier === pack.identifier}
                                tabIndex={size === "full" || selectedIdentifier === pack.identifier ? 0 : -1}
                                aria-label={t(pack.name)}
                                aria-disabled={pack.isLocked || pack.isNotFound}
                                disabled={size !== "full" && (pack.isLocked || pack.isNotFound)}
                                onClick={() => {
                                    if (!pack.isLocked && !pack.isNotFound) onSelect(pack.identifier);
                                }} onKeyDown={event => handleKeyDown(event, pack.identifier)}>
                                <div inert aria-hidden="true">
                                    <TabPackBoxStyled key={`${pack.identifier}-${pack.isLocked}-${pack.isNotFound}`} $fullSize={size === "full"} {...pack} id={`${idPrefix}-card-${pack.identifier}`}
                                        card={getCollectionCard(pack.card, pack)}
                                        isSelected={selectedIdentifier === pack.identifier} isSelectable={false} isFlippable={false}
                                        $color={pack.card.color ?? "black"} $textStroke={pack.styles?.text?.stroke ?? "black"}
                                        amount={Math.trunc(pack.decks.reduce((total, deck) => total + (deck.cards?.length ?? 0), 0) / 5)}/>
                                </div>
                            </TabStyled>
                        </TabTooltipReferenceStyled>
                    </TabTooltipStyled>
                );
            })}
        </TabsStyled>
    );
};

export default PackTabs;
