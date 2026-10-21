import {FC} from "react";
import {signedFormatNumber} from "helpers";
import {SignedNumberStyled} from "./styles.ts";
import {SignedNumberTagPropsType} from "./types.ts";

const SignedNumber: FC<SignedNumberTagPropsType> = ({children, className}) => {
    return (
        <SignedNumberStyled className={className}>
            {signedFormatNumber(children)}
        </SignedNumberStyled>
    );
};

export default SignedNumber;
