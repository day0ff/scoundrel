import {FC, memo, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {getMixBlendMode} from "entities/cards/constants.ts";
import {
    CardImage,
    CardInner,
    MarkTop,
    GlossLayer,
    CardFacetStyled,
    CardFacetBackStyled,
    PixelCardFaceStyled
} from "./styles.ts";
import {CardPropsType} from "./types.ts";

const Card:FC<CardPropsType> = ({$size, type, name, color, face, back, rotateY, backgroundPosition, opacity, labels, button, tooltip, mark}) => {
    const {t} = useTranslation();

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
        <CardInner style={{rotateY}}>
            <CardFacetStyled $size={$size}>
                {face.base && <CardImage src={face.base}/>}
                {face.image && <CardImage src={face.image} style={faceImageStyle}/>}
                {face.overlay && <CardImage src={face.overlay} style={faceOverlayStyle}/>}
                <PixelCardFaceStyled $size={$size}/>
                {mark ?? <MarkTop $color={color}>{t(name ?? type)}</MarkTop>}
                {tooltip}
                {labels}
                <GlossLayer
                    style={{
                        backgroundPosition,
                        opacity,
                    }}
                />
                {button}
            </CardFacetStyled>
            <CardFacetBackStyled $size={$size}>
                {back.base && <CardImage src={back.base}/>}
                {back.image && <CardImage src={back.image} style={backImageStyle}/>}
                {back.overlay && <CardImage src={back.overlay} style={backOverlayStyle}/>}
                <PixelCardFaceStyled $size={$size}/>
                {tooltip}
                <GlossLayer
                    style={{
                        backgroundPosition,
                        opacity,
                    }}
                />
            </CardFacetBackStyled>
        </CardInner>
    );
}

export default memo(Card);