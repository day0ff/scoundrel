import {useRef, useState, type FC} from "react";
import {createPortal} from "react-dom";
import {useTranslation} from "react-i18next";
import {useSoundEffect} from "hooks/useSoundEffect.ts";
import {useAttackLunge} from "hooks/useAttackLunge.ts";
import type {AttackFeedbackPropsType} from "./types.ts";
import {AttackCardLayerStyled, AttackFeedbackStyled, AttackMessageStyled} from "./styles.ts";
import {ATTACK_SOUNDS} from "./constants.ts";

const AttackFeedback: FC<AttackFeedbackPropsType> = ({event, duration}) => {
    const {t} = useTranslation();
    const {enemy, healthDamage, weaponBroken} = event;
    const layerRef = useRef<HTMLDivElement>(null);
    useAttackLunge(event.attackerId, event.enemyId, duration, healthDamage, layerRef);
    const [soundIndex] = useState(() => Math.floor(Math.random() * 3));
    useSoundEffect(ATTACK_SOUNDS[healthDamage > 0 ? "damage" : "blocked"][soundIndex], 0);
    return (
        <AttackFeedbackStyled $duration={duration} $damaged={healthDamage > 0}>
            {createPortal(<AttackCardLayerStyled ref={layerRef} aria-hidden="true"/>, document.body)}
            <AttackMessageStyled role="status">
                <strong>{t("ui.attack.defeated", {enemy: t(enemy.name)})}</strong>
                <span>{healthDamage > 0 ? t("ui.attack.damage", {amount: healthDamage}) : t("ui.attack.blocked")}</span>
                {weaponBroken && <strong>{t("ui.attack.weaponBroken")}</strong>}
            </AttackMessageStyled>
        </AttackFeedbackStyled>
    );
};

export default AttackFeedback;
