import {useRef, useState, type FC} from "react";
import {createPortal} from "react-dom";
import {useSoundEffect} from "hooks/useSoundEffect.ts";
import {useAttackLunge} from "hooks/useAttackLunge.ts";
import type {AttackFeedbackPropsType} from "./types.ts";
import {AttackCardLayerStyled, AttackFeedbackStyled} from "./styles.ts";
import {ATTACK_SOUNDS} from "./constants.ts";

const AttackFeedback: FC<AttackFeedbackPropsType> = ({event, duration}) => {
    const {healthDamage} = event;
    const layerRef = useRef<HTMLDivElement>(null);
    useAttackLunge(event.attackerId, event.enemyId, duration, healthDamage, layerRef);
    const [soundIndex] = useState(() => Math.floor(Math.random() * 3));
    useSoundEffect(ATTACK_SOUNDS[healthDamage > 0 ? "damage" : "blocked"][soundIndex], 0);
    return (
        <AttackFeedbackStyled $duration={duration} $damaged={healthDamage > 0}>
            {createPortal(<AttackCardLayerStyled ref={layerRef} aria-hidden="true"/>, document.body)}
        </AttackFeedbackStyled>
    );
};

export default AttackFeedback;
