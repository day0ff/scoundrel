import {useEffect, useState, type FC} from "react";
import {createPortal} from "react-dom";
import {FOG_FADE_MS, FOG_PARTICLES} from "./constants.ts";
import {FogParticleStyled, FogCloudStyled, FogLayerStyled} from "./styles.ts";
import type {ActionFogFeedbackPropsType} from "./types.ts";

const ActionFogFeedback: FC<ActionFogFeedbackPropsType> = ({fog}) => {
    const [display, setDisplay] = useState(fog);
    // Keep the same layer throughout a grouped action and retain it for its fade-out.
    if (fog && display !== fog) setDisplay(fog);

    useEffect(() => {
        if (fog) return;
        const timer = setTimeout(() => setDisplay(undefined), FOG_FADE_MS);
        return () => clearTimeout(timer);
    }, [fog]);

    if (!display) return null;

    return createPortal(
        <FogLayerStyled key={display.id} $color={display.color} $visible={!!fog} aria-hidden="true">
            <FogCloudStyled/>
            <FogCloudStyled/>
            <FogCloudStyled/>
            {FOG_PARTICLES.map((particle, index) => (
                <FogParticleStyled key={index} $x={particle.x} $y={particle.y}
                    $size={particle.size} $drift={particle.drift}
                    $duration={particle.duration} $delay={particle.delay}/>
            ))}
        </FogLayerStyled>,
        document.body,
    );
};

export default ActionFogFeedback;
