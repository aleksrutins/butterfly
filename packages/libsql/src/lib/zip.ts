export function zip<A1 extends unknown[], A2 extends unknown[]>(a1: A1, a2: A2) {
    return a1.map((key, idx) => [key, a2[idx]]);
}
