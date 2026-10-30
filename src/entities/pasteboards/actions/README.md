Actions can set optional visual effects with `animation`. Each setting is independent;
omitted effects are disabled. Colors accept CSS color values, for any card suit.

For example, a Dark Lord hatch action can give its hatchling a crimson border,
a purple glow, and both movements during the hatch animation:

```ts
{
    id: "hatchDragon",
    phase: "day0ff:phase-playerAction",
    type: "hatchOnAttack",
    identifier: "day0ff:pasteboard-dark.A",
    animation: {
        borderColor: "crimson",
        glowColor: "purple",
        shake: true,
        swing: true,
    },
}
```

Summon, drain, and consume actions animate the card performing the action.
Hatch actions animate the hatchling. Sound actions animate the card playing the
sound for the audio's actual duration. Shake and swing ease in and out and are
disabled for reduced motion. Effects are cancelled when the action finishes or
its UI unmounts, restoring the normal border and appearance.

These settings control the acting card's visuals. Scene effects such as summoned
cards rising, egg shells cracking, and potion particles keep their own styling.


Use a `call` action to create a new card and fly it into the room from outside
the screen. It uses `call-1.mp3`, then runs the arriving card's room-entry sound
actions (such as a dragon's roar). The room displays a temporary extra slot if
full; its configured capacity stays unchanged. Unlike `summon`, `call` always
creates a new card rather than retrieving an existing one.

```ts
{
    id: "callDragon",
    phase: roomEntryPhase.identifier,
    type: "call",
    identifier: "day0ff:pasteboard-dark.A.darkDragon",
    animation: {borderColor: "whitesmoke", glowColor: "whitesmoke", swing: true},
}
```
