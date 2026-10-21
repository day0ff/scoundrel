import Money from "./components/Money";
import Score from "./components/Score";
import Wave from "./components/WaveText";
import Typewriter from "./components/Typewriter";
import WaveTypewriter from "./components/WaveTypewriter";
import SignedNumber from "./components/SignedNumber";

export const FORMATTERS_TAG_COMPONENTS_MAP = {
    money: <Money />,
    score: <Score />,
    signed: <SignedNumber />,
    typewriter: <Typewriter />,
    wave: <Wave />,
    waveTypewriter: <WaveTypewriter />,
};

export const FORMATTERS_COMPONENTS_MAP = {
    money: Money,
    score: Score,
    signed: SignedNumber,
    typewriter: Typewriter,
    wave: Wave,
    waveTypewriter: WaveTypewriter,
};