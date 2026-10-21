import type {FC} from "react";
import {Outlet} from "react-router";
import AudioController from "components/AudioController";

const PageLayout: FC = () => (
    <>
        <AudioController/>
        <Outlet/>
    </>
);

export default PageLayout;
