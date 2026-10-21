import {useEffect, useState, type FC} from "react";
import {useTranslation} from "react-i18next";
import {GameButtonStyled} from "pages/ClassicGame/styles.ts";
import Score from "components/TooltipContent/components/Formatters/components/Score";
import type {ScoreMeterPropsType} from "./types.ts";
import {SCORE_ANIMATION_DURATION} from "./constants.ts";
import {ScoreMeterStyled, TrackStyled, FillStyled, ZeroStyled, ValueStyled, IndicatorStyled} from "./styles.ts";

const ScoreMeter: FC<ScoreMeterPropsType> = ({min, max, score}) => {
    const {t} = useTranslation();
    const [value, setValue] = useState(min);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        setValue(min);
        if (!isStarted) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setValue(score);
            return;
        }
        const timer = window.setTimeout(() => {
            cancelAnimationFrame(frame);
            setValue(score);
        }, SCORE_ANIMATION_DURATION);
        let frame = 0;
        const started = performance.now();
        const animate = (time: number) => {
            const progress = Math.min(1, (time - started) / SCORE_ANIMATION_DURATION);
            setValue(min + (score - min) * progress);
            if (progress < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(frame);
            window.clearTimeout(timer);
        };
    }, [min, score, isStarted]);

    const range = max - min || 1;
    const percent = Math.max(0, Math.min(100, (value - min) / range * 100));
    const displayedScore = Math.round(value);
    const format = (number: number) => number > 0 ? `+${number}` : `${number}`;

    return (
        <ScoreMeterStyled>
            <div>
                <span id="game-result-score-label">{t("ui.gameResult.score")}</span>
                <ValueStyled aria-live={value === score ? "polite" : "off"} aria-atomic="true">
                    {isStarted ? <Score unit={displayedScore > 0 ? "+" : ""} color="#f4d77f">{displayedScore}</Score> : "?"}
                </ValueStyled>
                {!isStarted && <GameButtonStyled onClick={() => setIsStarted(true)}>
                    {t("ui.gameResult.revealScore")}
                </GameButtonStyled>}
            </div>
            <div>
                <span>{format(max)}</span>
                <TrackStyled role="meter" aria-hidden={!isStarted} aria-labelledby="game-result-score-label"
                    aria-valuemin={min} aria-valuemax={max} aria-valuenow={displayedScore} aria-valuetext={format(displayedScore)}>
                    <FillStyled style={{height: `${percent}%`}} />
                    <ZeroStyled style={{bottom: `${-min / range * 100}%`}}><span>0</span></ZeroStyled>
                    {isStarted && <IndicatorStyled aria-hidden="true" style={{bottom: `${percent}%`}} />}
                </TrackStyled>
                <span>{format(min)}</span>
            </div>
        </ScoreMeterStyled>
    );
};

export default ScoreMeter;
