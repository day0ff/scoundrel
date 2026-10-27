import {type FC, type KeyboardEvent, useRef} from "react";
import {useTranslation} from "react-i18next";
import type {PackTabsPropsType} from "./types.ts";
import {TabsStyled, TabStyled, TabPackBoxStyled} from "./styles.ts";

const PackTabs: FC<PackTabsPropsType> = ({packs, selectedIdentifier, onSelect, label, idPrefix, panelId, size = "compact"}) => {
    const {t} = useTranslation();
    const tabs = useRef<HTMLDivElement>(null);
    const available = packs.filter(pack => !pack.isLocked && !pack.isNotFound);
    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, identifier: string) => {
        if (!available.length) return;
        const index = available.findIndex(pack => pack.identifier === identifier);
        let nextIndex: number;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % available.length;
        else if (event.key === "ArrowLeft") nextIndex = (index + available.length - 1) % available.length;
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
        <TabsStyled ref={tabs} role={panelId ? "tablist" : "group"} aria-label={label}>
            {packs.map(pack => (
                <TabStyled key={pack.identifier} type="button" id={`${idPrefix}-${pack.identifier}`}
                    role={panelId ? "tab" : undefined} aria-controls={panelId}
                    aria-selected={panelId ? selectedIdentifier === pack.identifier : undefined}
                    aria-pressed={panelId ? undefined : selectedIdentifier === pack.identifier}
                    tabIndex={selectedIdentifier === pack.identifier ? 0 : -1}
                    aria-label={t(pack.name)} title={t(pack.name)} disabled={pack.isLocked || pack.isNotFound}
                    onClick={() => onSelect(pack.identifier)} onKeyDown={event => handleKeyDown(event, pack.identifier)}>
                    <div inert aria-hidden="true">
                        <TabPackBoxStyled $fullSize={size === "full"} {...pack} id={`${idPrefix}-card-${pack.identifier}`}
                            isSelected={selectedIdentifier === pack.identifier} isSelectable={false} isFlippable={false}
                            $color={pack.card.color ?? "black"} $textStroke={pack.styles?.text?.stroke ?? "black"}
                            amount={Math.trunc(pack.decks.reduce((total, deck) => total + (deck.cards?.length ?? 0), 0) / 5)}/>
                    </div>
                </TabStyled>
            ))}
        </TabsStyled>
    );
};

export default PackTabs;
