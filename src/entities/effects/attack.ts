export const calculateAttack = (enemyStrength: number, attackerStrength: number, durability?: number) => ({
    healthDamage: Math.max(0, enemyStrength - attackerStrength),
    durability: durability === undefined ? undefined : Math.max(0, durability - 1),
});
