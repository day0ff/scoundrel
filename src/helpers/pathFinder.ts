export type CoordinatesType = [number, number];

export function pathFinder(
    scheme: Array<Array< number | undefined>>,
    start: CoordinatesType,
    end: CoordinatesType
): Array<CoordinatesType> {
    const rows = scheme.length;
    const cols = scheme[0].length;

    const dist: number[][] = Array.from({ length: rows }, () =>
        Array(cols).fill(Infinity)
    );

    const prev: ( CoordinatesType | null )[][] = Array.from({ length: rows }, () =>
        Array(cols).fill(null)
    );

    const pq: Array<{ pos: CoordinatesType; cost: number }> = [];
    const push = (pos: CoordinatesType, cost: number) => {
        pq.push({ pos, cost });
        pq.sort((a, b) => a.cost - b.cost);
    };

    const [sx, sy] = start;
    const [ex, ey] = end;

    dist[sx][sy] = 0;
    push(start, 0);

    const directions: CoordinatesType[] = [
        [0, -1],
        [0, 1],
        [1, 0],
        [-1, 0],

    ];

    while (pq.length > 0) {
        const { pos, cost } = pq.shift()!;
        const [x, y] = pos;

        if (x === ex && y === ey) {
            // reconstruct path
            const path: Array<CoordinatesType> = [];
            let cur: CoordinatesType | null = [x, y];

            while (cur) {
                path.unshift(cur);
                cur = prev[cur[0]][cur[1]];
            }

            return path;
        }

        if (cost > dist[x][y]) continue;

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || ny < 0 || nx >= rows || ny >= cols) continue;

            const cell = scheme[nx][ny];

            if (!cell) continue; // blocked

            const newCost = cost + cell;

            if (newCost < dist[nx][ny]) {
                dist[nx][ny] = newCost;
                prev[nx][ny] = [x, y];
                push([nx, ny], newCost);
            }
        }
    }

    return [];
}
