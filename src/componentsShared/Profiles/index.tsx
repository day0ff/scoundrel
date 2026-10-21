import {FC, useState} from "react";
import {useAppSelector} from "store/hooks.ts";
import {useButtonSounds} from "hooks/useButtonSounds.ts";
import {useTranslation} from "react-i18next";
import {currentProfileIndexSelector, profilesProfilesLengthSelector} from "store/features/profiles/selectors.ts";
import Profile from "./components/Profile";
import {
    ProfilesButtonProfileStyled,
    ProfilesButtonsContainerStyled,
    ProfilesStyled,
    ProfilesTitleStyled
} from "./styles.ts";
import {ProfilesPropsType} from "./types.ts";

const Profiles: FC<ProfilesPropsType> = () => {
    const sounds = useButtonSounds<HTMLButtonElement>();
    const {t} = useTranslation()
    const length = useAppSelector(profilesProfilesLengthSelector);
    const index = useAppSelector(currentProfileIndexSelector);
    const [indexState, setIndexState] = useState(index > 0 ? index + 1 : 1);

    return (
        <ProfilesStyled>
            <ProfilesTitleStyled>
                {t`modal.profile.title`}
            </ProfilesTitleStyled>
            <ProfilesButtonsContainerStyled>
                <ProfilesButtonProfileStyled $selected={indexState <= 1} onMouseEnter={sounds.onMouseEnter} onMouseLeave={sounds.onMouseLeave} onFocus={sounds.onFocus} onClick={event => {
                        sounds.onClick(event);
                        setIndexState(1);
                    }}>
                    1
                </ProfilesButtonProfileStyled>
                {length >= 1 && (
                    <ProfilesButtonProfileStyled $selected={indexState === 2} onMouseEnter={sounds.onMouseEnter} onMouseLeave={sounds.onMouseLeave} onFocus={sounds.onFocus} onClick={event => {
                        sounds.onClick(event);
                        setIndexState(2);
                    }}>
                        2
                    </ProfilesButtonProfileStyled>
                )}
                {length >= 2 && (
                    <ProfilesButtonProfileStyled $selected={indexState >= 3} onMouseEnter={sounds.onMouseEnter} onMouseLeave={sounds.onMouseLeave} onFocus={sounds.onFocus} onClick={event => {
                        sounds.onClick(event);
                        setIndexState(3);
                    }}>
                        3
                    </ProfilesButtonProfileStyled>
                )}
            </ProfilesButtonsContainerStyled>
            <Profile index={indexState}/>
        </ProfilesStyled>
    );
}

export default Profiles;