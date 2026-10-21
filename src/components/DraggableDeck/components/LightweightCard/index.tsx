import {FC, useMemo} from "react";
import {getMixBlendMode} from "entities/cards/constants.ts";
import {
    LightweightCardInner,
    CardImage,
    GlossLayer,
    LightweightCardFacetStyled,
    LightweightCardFacetBackStyled,
    PixelCardFaceStyled
} from "./styles.ts";
import {LightweightCardPropsType} from "./types.ts";

const LightweightCard:FC<LightweightCardPropsType> = ({$size, face, back, rotateY, backgroundPosition, opacity, className, index = 0}) => {
    const faceImageStyle = useMemo(() => ({
        mixBlendMode: getMixBlendMode(face?.imageMode)
    }), [face?.imageMode])
    const faceOverlayStyle = useMemo(() => ({
        mixBlendMode: getMixBlendMode(face?.overlayMode)
    }), [face?.overlayMode])

    const backImageStyle = useMemo(() => ({
        mixBlendMode: getMixBlendMode(back?.imageMode)
    }), [back?.imageMode])
    const backOverlayStyle = useMemo(() => ({
        mixBlendMode: getMixBlendMode(back?.overlayMode)
    }), [back?.overlayMode])

    return (
        <LightweightCardInner className={className} style={{rotateY}} index={index}>
            <LightweightCardFacetStyled $size={$size}>
                {face.base && <CardImage src={face.base}/>}
                {face.image && <CardImage src={face.image} style={faceImageStyle}/>}
                {face.overlay && <CardImage src={face.overlay} style={faceOverlayStyle}/>}
                <PixelCardFaceStyled $size={$size}/>
                <GlossLayer
                    style={{
                        backgroundPosition,
                        opacity,
                    }}
                />
            </LightweightCardFacetStyled>
            <LightweightCardFacetBackStyled $size={$size}>
                {back.base && <CardImage src={back.base}/>}
                {back.image && <CardImage src={back.image} style={backImageStyle}/>}
                {back.overlay && <CardImage src={back.overlay} style={backOverlayStyle}/>}
                <PixelCardFaceStyled $size={$size}/>
                <GlossLayer
                    style={{
                        backgroundPosition,
                        opacity,
                    }}
                />
            </LightweightCardFacetBackStyled>
        </LightweightCardInner>
    );
}

export default LightweightCard;