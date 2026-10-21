import { FC } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/themes/light.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/themes/material.css";
import "tippy.js/themes/translucent.css";
import TooltipContent from "../TooltipContent";
import { TooltipStyled } from "./styles.ts";
import { TooltipPropsType } from "./types.ts";

const Tooltip: FC<TooltipPropsType> = ({
  visible,
  translationKey,
  content,
  children,
  className,
  maxWidth = "80vw",
  minWidth,
  values,
  ...rest
}) => {
  return (
    <TooltipStyled
      $maxWidth={maxWidth}
      $minWidth={minWidth}
      className={className}
    >
      <Tippy
        animation={"shift-away"}
        arrow={false}
        interactive={true}
        touch={["hold", 1500]}
        {...(visible === undefined && { trigger: "mouseenter focus" })}
        offset={[0, 10]}
        delay={[1500, 100]}
        theme={"light-border"}
        content={
          content ?? (
            <TooltipContent translationKey={translationKey} values={values} />
          )
        }
        {...rest}
      >
        {children}
      </Tippy>
    </TooltipStyled>
  );
};

export default Tooltip;
