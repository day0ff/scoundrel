import type {FC} from "react";
import {useTranslation} from "react-i18next";
import {useAppSelector} from "store/hooks.ts";
import {activeEffectAnimationClassicGameSelector, heroClassicGameSelector} from "store/features/classic-game/selectors.ts";
import {ANIMATIONS_MAP} from "entities/animations/constants.ts";
import {BASE_URL} from "constants.ts";
import Tooltip from "components/Tooltip";
import {HeroHealthBarStyled, HealthContentStyled, HeartIconStyled, HealthTrackStyled, HealthFillStyled, HealingHealthFillStyled, HealthLabelStyled} from "./styles.ts";

const HeroHealthBar: FC = () => {
    const {t} = useTranslation();
    const hero = useAppSelector(heroClassicGameSelector);
    const event = useAppSelector(activeEffectAnimationClassicGameSelector);
    const animation = event && ANIMATIONS_MAP[event.animation];
    if (!hero) return null;
    const {name} = hero;
    const health = event?.healthAfter ?? hero.health;
    const current = Math.max(health.min, Math.min(health.max, health.current));
    const range = health.max - health.min;
    const fill = range > 0 ? (current - health.min) / range * 100 : 0;
    const previousHealth = event?.healthBefore ?? health;
    const previousRange = previousHealth.max - previousHealth.min;
    const previousFill = previousRange > 0 ? Math.max(0, Math.min(100, (previousHealth.current - previousHealth.min) / previousRange * 100)) : 0;

    return (
        <HeroHealthBarStyled data-hero-health>
            <Tooltip translationKey="ui.hero.health.description" placement="bottom" interactive={false}>
                <HealthContentStyled tabIndex={0}>
                    <HealthLabelStyled $title>{t("ui.hero.health")}</HealthLabelStyled>
                    <HeartIconStyled src={`${BASE_URL}/images/interface/heart.png`} alt="" aria-hidden="true" draggable={false}/>
                    <HealthTrackStyled
                        role="meter"
                        aria-label={`${t(name)} · ${t("ui.hero.health")}`}
                        aria-valuemin={health.min}
                        aria-valuemax={health.max}
                        aria-valuenow={current}
                    >
                        {event && animation ? (
                            <HealingHealthFillStyled key={event.id} $from={previousFill} $to={fill} $duration={animation.durationMs} />
                        ) : (
                            <HealthFillStyled $fill={fill} />
                        )}
                        <HealthLabelStyled $overlay>
                            <span data-single-digit={current >= 0 && current < 10}>{current}</span>
                            <span>/</span>
                            <span data-single-digit={health.max >= 0 && health.max < 10}>{health.max}</span>
                        </HealthLabelStyled>
                    </HealthTrackStyled>
                    <HealthLabelStyled $outside>{current}/{health.max}</HealthLabelStyled>
                </HealthContentStyled>
            </Tooltip>
        </HeroHealthBarStyled>
    );
};

export default HeroHealthBar;
