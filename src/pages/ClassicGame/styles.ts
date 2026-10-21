import styled from "styled-components";
import MainFrame from "components/MainFrame";
import MenuButton from "pages/MainMenu/components/MenuButton";
import { ButtonStyled, PageContainerStyled, TextStrokeWithShadowStyle } from "../../styles";
import { FrameStyled } from "components/Frame/styles";

export const ClassicGameStyled = styled(PageContainerStyled).attrs({
  as: "main",
})`
  height: 100dvh;
  min-height: 0;
  max-height: 100dvh;
  box-sizing: border-box;
  padding: 0;
  justify-content: flex-start;
  overflow: hidden;
  color: #f1edda;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (orientation: portrait) {
    justify-content: center;
    gap: 0;
  }
`;

export const GameHeaderStyled = styled.header`
  pointer-events: none;
  justify-content: space-between;
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px 24px;
  padding: 12px 24px;
  background: transparent;

  @media ${({theme}) => theme.media.laptop} {
    gap: 8px 16px;
    padding: 8px 16px;
  }

  @media ${({theme}) => theme.media.tablet} {
    gap: 8px;
    padding: 4px 8px;
  }

  @media ${({theme}) => theme.media.mobile} {
    flex-wrap: wrap;
    gap: 4px;
    padding: 4px;
  }
`;

export const HeaderRoomTitleStyled = styled.p`
  display: none;
  margin: 0 0 0 auto;
  padding: 0 16px 0 0;
  color: #d2a052;
  font-weight: normal;
  text-transform: capitalize;
  line-height: 1.4;
  text-align: right;
  ${TextStrokeWithShadowStyle};

  @media ${({theme}) => theme.media.tablet} {
    display: block;
    font-size: 24px;
    letter-spacing: -1px;
  }

  @media ${({theme}) => theme.media.mobile} {
    font-size: clamp(18px, 5vw, 24px);
    letter-spacing: 0;
  }
`;

export const HeaderMenuButtonStyled = styled(MenuButton)<{$tabletMenu?: boolean}>`
  pointer-events: auto;
  font-size: 36px;
  letter-spacing: -3px;
  max-width: 100%;
  min-width: 0;
  min-height: 44px;
  box-sizing: border-box;
  text-overflow: ellipsis;

  @media ${({theme}) => theme.media.tablet} {
    display: ${({$tabletMenu}) => $tabletMenu ? "inline-block" : "none"};
  }

  @media ${({theme}) => theme.media.laptop} {
    font-size: 30px;
    letter-spacing: -2px;
  }

  @media ${({theme}) => theme.media.tablet} {
    font-size: 24px;
    letter-spacing: -1px;
  }

  @media ${({theme}) => theme.media.mobile} {
    font-size: clamp(18px, 5vw, 24px);
    letter-spacing: 0;
  }
`;

export const HeroFrameStyled = styled(MainFrame)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;

  @media (orientation: portrait) {
    ${FrameStyled} {
      padding: 0;
    }
  }
`;

export const HealthFrameStyled = styled(MainFrame)`
  min-width: 0;
  > [data-hero-health] {
    width: 100%;
  }

  @media (orientation: portrait) {
    ${FrameStyled} {
      padding: 12px 12px 0;
    }
  }
`;

export const HeroZonesStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media ${({theme}) => theme.media.laptop} {
    grid-template-columns: auto auto;
  }
`;

export const GameTableStyled = styled.div`
  display: grid;
  width: 100%;
  max-width: 1600px;
  box-sizing: border-box;
  padding: 16px;
  justify-content: center;
  align-self: center;
  margin-block: auto;
  grid-template-columns:
    max-content minmax(0, 760px) max-content;
  gap: 12px;
  align-items: start;

  @media ${({theme}) => theme.media.laptop} {
    padding: 0 16px;
    gap: 4px;
  }

  > [data-dungeon-rooms] {
    grid-column: 2;
    grid-row: 1;
    min-width: 0;
    contain: inline-size;

    @media ${({theme}) => theme.media.tablet} {
      height: 62px;
      overflow: visible;
    }
  }
  > [data-zone="dungeon"] {
    grid-column: 1;
    grid-row: 2;
  }
  > [data-room-frame] {
    grid-column: 2;
    grid-row: 2;
    min-width: 0;
  }
  > [data-zone="discard"] {
    grid-column: 3;
    grid-row: 2;
  }
  > [data-health-frame] {
    grid-column: 2;
    grid-row: 3;
    min-width: 0;
    align-self: center;
    // justify-self: center;
  }
  > [data-turn-controls] {
    grid-column: 3;
    grid-row: 3;
    min-width: 0;
    align-self: center;
    justify-self: center;
  }
  > [data-hero-frame] {
    grid-column: 2;
    grid-row: 4;
    min-width: 0;
  }
  > [data-hero-portrait] {
    grid-column: 1;
    grid-row: 4;
  }
  > [data-room-frame],
  > [data-hero-frame] {
    width: 100%;
    max-width: 100%;
    justify-self: stretch;
  }
  > [data-zone="crypt"] {
    grid-column: 3;
    grid-row: 4;
  }
  > [data-zone] {
    align-self: start;
    min-width: 0;
  }

  @media (orientation: portrait) {
    padding: 42px 8px 8px;
    height: 100%;
    min-height: 0;
    flex: 1;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(5, auto);
    align-content: stretch;
    align-items: stretch;
    gap: 12px 8px;
    margin-block: 0;

    > [data-zone] {
      align-self: stretch;
    }

    > [data-dungeon-rooms] {
      grid-column: 1 / -1;
      grid-row: 1;
      align-self: center;
    }
    > [data-room-frame] {
      grid-column: 1 / -1;
      grid-row: 2;
    }
    > [data-health-frame] {
      grid-column: 1 / 3;
      grid-row: 4;
    }
    > [data-turn-controls] {
      grid-column: 3;
      grid-row: 4;
      z-index: 1;
    }
    > [data-hero-frame] {
      grid-column: 1 / -1;
      grid-row: 5;
    }
    > [data-zone="dungeon"] {
      grid-column: 1;
      grid-row: 3;
      justify-self: end;
    }
    > [data-zone="discard"] {
      grid-column: 2;
      grid-row: 3;
    }
    > [data-zone="crypt"] {
      grid-column: 3;
      grid-row: 3;
      justify-self: start;
    }
    > [data-hero-portrait] {
      display: none;
    }
  }
`;

export const GameButtonStyled = styled(ButtonStyled)<{
  $backgroundColor?: string;
}>`
  width: auto;
  padding: 10px 14px;
  background-color: ${({ $backgroundColor }) => $backgroundColor ?? "#263c2e"};
  text-align: center;
  text-decoration: none;
  &:focus-visible {
    outline: 3px solid #f4d77f;
    outline-offset: 4px;
  }
  &:disabled {
    cursor: default;
  }
`;
