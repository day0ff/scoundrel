import {FC, SyntheticEvent, type ChangeEvent, useEffect, useState} from "react";
import {useAudioManager} from "hooks/useAudioManager.ts";
import {KEYPRESS_SOUNDS} from "./constants.ts";
import {useButtonSounds} from "hooks/useButtonSounds.ts";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "store/hooks.ts";
import {getProfileByIndexSelector, profilesCurrentProfileIdSelector} from "store/features/profiles/selectors.ts";
import {createProfile, setCurrentProfileId, updateProfile} from "store/features/profiles";
import {
    ProfilesButtonCreateStyled,
    ProfilesButtonLoadStyled,
    ProfilesButtonSaveStyled,
    ProfilesContainerStyled,
    ProfilesInputStyled,
} from "./styles.ts";
import {ProfilePropsType} from "./types.ts";

const Profile: FC<ProfilePropsType> = ({index}) => {
    const audio = useAudioManager();
    const sounds = useButtonSounds<HTMLButtonElement>();
    const inputSounds = useButtonSounds<HTMLInputElement>();
    const {t} = useTranslation()
    const dispatch = useAppDispatch();
    const currentProfileId = useAppSelector(profilesCurrentProfileIdSelector);
    const profile = useAppSelector(getProfileByIndexSelector(index));
    const isCurrentProfileSelected = currentProfileId === profile?.profileId;
    const hasProfile = Boolean(profile);

    const [name, setName] = useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
        const url = KEYPRESS_SOUNDS[Math.floor(Math.random() * KEYPRESS_SOUNDS.length)];
        void audio.unlock().then(unlocked => {
            if (unlocked) return audio.playSound({url});
        }).catch((error: unknown) => {
            console.warn("Unable to play keypress sound", error);
        });
    }

    const handleCreate = (event: SyntheticEvent) => {
        event.stopPropagation();
        event.preventDefault();

        if (!name) return;

        const action = dispatch(createProfile(name));

        dispatch(setCurrentProfileId(action.payload.profileId))
    }

    const handleSave = (event: SyntheticEvent) => {
        event.stopPropagation();
        event.preventDefault();

        if (!name || !profile) return;

        dispatch(updateProfile({
            ...profile,
            name
        }))
    }

    const handleLoad = (event: SyntheticEvent) => {
        event.stopPropagation();
        event.preventDefault();

        if (!profile?.profileId) return;

        dispatch(setCurrentProfileId(profile?.profileId))
    }

    useEffect(() => {
        setName(profile?.name ?? "");
    }, [profile?.name, index]);

    const isDisabled = name === (profile?.name ?? "");

    return (
        <ProfilesContainerStyled>
            <ProfilesInputStyled
                type={"text"}
                name={"name"}
                value={name}
                placeholder={t`input.name.placeholder`}
                maxLength={8}
                onMouseEnter={inputSounds.onMouseEnter}
                onMouseLeave={inputSounds.onMouseLeave}
                onFocus={inputSounds.onFocus}
                onChange={handleChange}
            />
            {hasProfile ? isCurrentProfileSelected ? isDisabled ? (
                <ProfilesButtonLoadStyled disabled={isDisabled} onMouseEnter={sounds.onMouseEnter} onMouseLeave={sounds.onMouseLeave} onFocus={sounds.onFocus} onClick={event => {
                    sounds.onClick(event);
                    handleLoad(event);
                }}>
                    {t`button.currentProfile.text`}
                </ProfilesButtonLoadStyled>
            ) : (
                <ProfilesButtonSaveStyled disabled={isDisabled} onMouseEnter={sounds.onMouseEnter} onMouseLeave={sounds.onMouseLeave} onFocus={sounds.onFocus} onClick={event => {
                    sounds.onClick(event);
                    handleSave(event);
                }}>
                    {t`button.save.text`}
                </ProfilesButtonSaveStyled>
            ) : (
                <ProfilesButtonLoadStyled onMouseEnter={sounds.onMouseEnter} onMouseLeave={sounds.onMouseLeave} onFocus={sounds.onFocus} onClick={event => {
                    sounds.onClick(event);
                    handleLoad(event);
                }}>
                    {t`button.load.text`}
                </ProfilesButtonLoadStyled>
            ) : (
                <ProfilesButtonCreateStyled disabled={isDisabled} onMouseEnter={sounds.onMouseEnter} onMouseLeave={sounds.onMouseLeave} onFocus={sounds.onFocus} onClick={event => {
                    sounds.onClick(event);
                    handleCreate(event);
                }}>
                    {t`button.create.text`}
                </ProfilesButtonCreateStyled>
            )
            }
        </ProfilesContainerStyled>
    )
        ;
}

export default Profile;