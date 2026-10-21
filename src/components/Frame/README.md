# Frame

`Frame` renders a resizable border from an image containing one frame. Its eight SVG pieces preserve the corners and tile the edges at native pixel size. The center stays transparent and children render inside the container.

```tsx
import Frame from "components/Frame";

<Frame
    spriteUrl={`${import.meta.env.BASE_URL}images/interface/main-frame/inner.png`}
    config={{width: 366, height: 268, cornerWidth: 26, cornerHeight: 22, borderWidth: 8, borderHeight: 8}}
    style={{width: 600, minHeight: 300}}
>
    Content
</Frame>
```

Config dimensions are native image pixels. `width` and `height` describe the complete image. `cornerWidth` and `cornerHeight` define the four corner cuts. `borderWidth` defines the left/right edge thickness; `borderHeight` defines the top/bottom edge thickness. Both corner dimensions must be positive and less than half the corresponding image dimension. Border thickness must be positive and no larger than its corresponding corner dimension.

The component reserves corner-sized padding and minimum dimensions. Normal div attributes and `styled(Frame)` are supported.

For the predefined main interface frames:

```tsx
import MainFrame from "components/MainFrame";

<MainFrame variant="outer">Outer panel</MainFrame>
<MainFrame variant="inner">Inner panel</MainFrame>
<MainFrame variant="title">Title</MainFrame>
```

`variant` defaults to `outer`. Image URLs and cutting configs live in `components/MainFrame/constants.ts` under `MAIN_FRAME_MAP`.
