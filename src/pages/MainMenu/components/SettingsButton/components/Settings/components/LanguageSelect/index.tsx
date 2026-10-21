import {useEffect, useId, useRef, useState, type FC} from "react";
import {useTranslation} from "react-i18next";
import {useButtonSounds} from "hooks/useButtonSounds.ts";
import {LANGUAGES} from "./constants.ts";
import {LanguageStyled, TriggerStyled, OptionsStyled} from "./styles.ts";
import LanguageOption from "./components/LanguageOption";

const LanguageSelect: FC = () => {
    const {t, i18n} = useTranslation();
    const id = useId();
    const [open, setOpen] = useState(false);
    const container = useRef<HTMLDivElement>(null);
    const trigger = useRef<HTMLButtonElement>(null);
    const options = useRef<(HTMLButtonElement | null)[]>([]);
    const sounds = useButtonSounds<HTMLButtonElement>();
    const selected = LANGUAGES.find((language) => language.code === i18n.resolvedLanguage) ?? LANGUAGES[0];

    useEffect(() => {
        if (!open) return;
        options.current[LANGUAGES.indexOf(selected)]?.focus();
        const closeOutside = (event: PointerEvent) => {
            if (event.target instanceof Node && !container.current?.contains(event.target)) setOpen(false);
        };
        document.addEventListener("pointerdown", closeOutside);
        return () => document.removeEventListener("pointerdown", closeOutside);
    }, [open, selected]);

    return (
        <LanguageStyled
            ref={container}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
            }}
        >
            <label id={`${id}-label`} htmlFor={id}>{t("page.settings.language.select")}</label>
            <TriggerStyled
                ref={trigger}
                id={id}
                type="button"
                aria-labelledby={`${id}-label ${id}-value`}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={open ? `${id}-options` : undefined}
                onMouseEnter={sounds.onMouseEnter}
                onMouseLeave={sounds.onMouseLeave}
                onFocus={sounds.onFocus}
                onClick={(event) => {
                    sounds.onClick(event);
                    setOpen(!open);
                }}
                onKeyDown={(event) => {
                    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                        event.preventDefault();
                        setOpen(true);
                    }
                }}
            >
                <span id={`${id}-value`} lang={selected.code}>{selected.name}</span>
                <span aria-hidden="true">▾</span>
            </TriggerStyled>
            {open && (
                <OptionsStyled
                    id={`${id}-options`}
                    role="listbox"
                    aria-labelledby={`${id}-label`}
                    onKeyDown={(event) => {
                        const index = options.current.indexOf(document.activeElement as HTMLButtonElement);
                        let next = index;
                        if (event.key === "ArrowDown") next = (index + 1) % LANGUAGES.length;
                        else if (event.key === "ArrowUp") next = (index + LANGUAGES.length - 1) % LANGUAGES.length;
                        else if (event.key === "Home") next = 0;
                        else if (event.key === "End") next = LANGUAGES.length - 1;
                        else if (event.key === "Escape") {
                            event.preventDefault();
                            setOpen(false);
                            trigger.current?.focus();
                            return;
                        } else return;
                        event.preventDefault();
                        options.current[next]?.focus();
                    }}
                >
                    {LANGUAGES.map((language, index) => (
                        <LanguageOption
                            key={language.code}
                            code={language.code}
                            name={language.name}
                            selected={language.code === selected.code}
                            buttonRef={(button) => { options.current[index] = button; }}
                            onSelect={() => {
                                void i18n.changeLanguage(language.code);
                                setOpen(false);
                                trigger.current?.focus();
                            }}
                        />
                    ))}
                </OptionsStyled>
            )}
        </LanguageStyled>
    );
};

export default LanguageSelect;
