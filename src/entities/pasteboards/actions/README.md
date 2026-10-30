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


Weapon breaking is a standalone `day0ff:animation-weaponBreak` event. Future
reducer-side card actions can call `breakWeapon(state, weaponId)` from
`store/features/game/weapon-break.ts` to break a weapon in the room or equipped weapons zone. The helper
sets durability to zero, captures the card and slot for feedback, and handles the
crypt transfer. Repeated calls and attempts to break fists are ignored.

The UI retains the weapon until its break animation and randomly selected
`sword-break-1.mp3` or `sword-break-2.mp3` finish, then sends its fragments to
the crypt. Sound selection stays in presentation code so game replays remain
deterministic.

The `breakAllWeapons` action breaks every weapon in the room and equipped
weapons zone. Its `soundUrl` plays once alongside the grouped break animations,
including when there are no targets. Fists, potions, enemies, and cards in other
zones are unaffected. All affected weapons wait 300ms, then finish cracking within the following 200ms;
each then waits for its break sound before flying to the crypt.

```ts
{
    id: "breakAllWeapons",
    phase: roomEntryPhase.identifier,
    type: "breakAllWeapons",
    soundUrl: `${BASE_URL}/sounds/banshee-1.mp3`,
    animation: {borderColor: "whitesmoke", glowColor: "whitesmoke", shake: true},
}
```


For `breakAllWeapons`, add `fogColor` to the action's `animation` settings to
surround the cry and entire weapon-breaking sequence with fog. All queued events
share one fog group, so it fades in once and fades out after the last weapon
reaches the crypt. The fog includes drifting particles and fades in and out over 900ms.
Reduced-motion mode keeps the fades and disables drifting.
