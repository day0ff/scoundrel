import {useContext, useEffect, useState, type FC} from "react";
import {useTranslation} from "react-i18next";
import {PageTransitionContext} from "context/PageTransition/context.ts";
import CardZone from "../CardZone";
import {useAppSelector} from "store/hooks.ts";
import {useAudioManager} from "hooks/useAudioManager.ts";
import type {SoundPlaybackType} from "utils/AudioManager/types.ts";
import {currentRoomNumberSelector, roomWithAttackFeedbackSelector} from "./selectors.ts";
import {DEAL_SOUNDS, REMOVE_SOUNDS} from "./constants.ts";
import {CARD_STAGGER_MS, CARD_REVEAL_MS, CARD_REMOVE_MS} from "../CardZone/constants.ts";
import {RoomZoneStyled} from "./styles.ts";
import type {RoomZonePropsType} from "./types.ts";

const RoomZone: FC<RoomZonePropsType> = ({zone, appendTo, onAttack, previewEnemyId, onTransitionChange}) => {
    const {t} = useTranslation();
    const audio = useAudioManager();
    const pageTransitionBusy = useContext(PageTransitionContext);
    const roomNumber = useAppSelector(currentRoomNumberSelector);
    const feedbackZone = useAppSelector(roomWithAttackFeedbackSelector);
    const currentZone = feedbackZone ?? zone;
    const [display, setDisplay] = useState({roomNumber, zone: currentZone, animation: "reveal" as "reveal" | "remove" | undefined});

    // Retain the previous room for its exit, even though Redux has already dealt the next room.
    if (display.roomNumber !== roomNumber) {
        setDisplay({...display, roomNumber, animation: "remove"});
    } else if (display.animation !== "remove" && display.zone !== currentZone) {
        setDisplay({...display, zone: currentZone});
    }

    const animation = display.animation;
    const cardCount = display.zone.cards.length;
    useEffect(() => {
        onTransitionChange(!!animation);
        if (!animation || pageTransitionBusy) return;
        let cancelled = false;
        const playbacks: SoundPlaybackType[] = [];
        const timers: ReturnType<typeof setTimeout>[] = [];
        const play = (sounds: string[]) => {
            const url = sounds[Math.floor(Math.random() * sounds.length)];
            void audio.playSound({url}).then(playback => {
                if (!playback) return;
                if (cancelled) playback.stop();
                else playbacks.push(playback);
            }).catch((error: unknown) => console.warn("Unable to play card sound", error));
        };
        // Timers also avoid duplicate playback during Strict Mode's discarded effect setup.
        if (animation === "remove") {
            if (cardCount) timers.push(setTimeout(() => play(REMOVE_SOUNDS), 0));
        } else {
            for (let index = 0; index < cardCount; index++) {
                timers.push(setTimeout(() => play(DEAL_SOUNDS), index * CARD_STAGGER_MS));
            }
        }
        const duration = cardCount ? (cardCount - 1) * CARD_STAGGER_MS +
            (animation === "remove" ? CARD_REMOVE_MS : CARD_REVEAL_MS) : 0;
        timers.push(setTimeout(() => {
            setDisplay(previous => ({...previous, animation: animation === "remove" ? "reveal" : undefined}));
        }, duration));
        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
            playbacks.forEach(playback => playback.stop());
        };
    }, [animation, cardCount, roomNumber, audio, onTransitionChange, pageTransitionBusy]);

    useEffect(() => () => onTransitionChange(false), [onTransitionChange]);

    return (
        <RoomZoneStyled data-room-frame data-deal-paused={pageTransitionBusy} inert={!!animation}>
            <CardZone
                key={`${roomNumber}-${animation === "remove" ? "out" : "in"}`}
                zone={display.zone}
                cardAnimation={animation}
                appendTo={appendTo}
                onAttack={onAttack}
                previewEnemyId={previewEnemyId}
                framed={false}
                label={`${t("ui.zone.room")} ${roomNumber}`}
                emptyLabel={t("ui.zone.empty")}
            />
        </RoomZoneStyled>
    );
};

export default RoomZone;
