import {useLayoutEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/hooks.ts";
import {gameSelector} from "store/features/game/selectors.ts";
import {setTime} from "store/features/game";
import {formatRaceTime, parseRaceTime} from "store/features/game/time.ts";

export const useGameTimer = () => {
    const dispatch = useAppDispatch();
    const game = useAppSelector(gameSelector);
    const running = !!game && game.started !== false && !game.outcome;
    const time = game?.time ?? "00:00:00";

    useLayoutEffect(() => {
        if (!running) return;
        const startedAt = performance.now();
        const savedMilliseconds = parseRaceTime(time);
        // Save only when play stops or the ClassicGame page unmounts.
        return () => {
            dispatch(setTime(formatRaceTime(savedMilliseconds + performance.now() - startedAt)));
        };
    }, [dispatch, running, time]);
};
