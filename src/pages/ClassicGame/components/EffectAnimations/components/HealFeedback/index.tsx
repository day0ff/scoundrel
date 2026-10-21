import {useState, type FC} from "react";
import {useSoundEffect} from "hooks/useSoundEffect.ts";
import Card from "components/Card";
import PasteboardCardMark from "components/PasteboardCard/components/PasteboardCardMark";
import {HealGlowStyled, HealParticleStyled, HealPotionStyled} from "./styles.ts";
import type {HealFeedbackPropsType} from "./types.ts";

const HealFeedback: FC<HealFeedbackPropsType> = ({duration, potion}) => {
    const [particles] = useState(() => Array.from({length: 24}, (_, index) => ({
        x: 3 + Math.random() * 94,
        y: 5 + Math.random() * 90,
        size: 2 + Math.random() * 4,
        delay: index < 6 ? 0 : Math.random() * 0.1,
        drift: (Math.random() - 0.5) * 24,
    })));

    useSoundEffect("/sounds/healing.mp3", 0);

    return (
        <HealGlowStyled $duration={duration} aria-hidden="true">
            {potion && (
                <HealPotionStyled $duration={Math.min(duration, 900)}>
                    <Card
                        {...potion.card}
                        $size={6}
                        mark={<PasteboardCardMark suit={potion.suit} rank={potion.rank} color={potion.card.color} />}
                    />
                </HealPotionStyled>
            )}
            {particles.map((particle, index) => (
                <HealParticleStyled
                    key={index}
                    $x={particle.x}
                    $y={particle.y}
                    $size={particle.size}
                    $delay={particle.delay * duration}
                    $duration={duration * 0.55}
                    $drift={particle.drift}
                />
            ))}
        </HealGlowStyled>
    );
};

export default HealFeedback;
