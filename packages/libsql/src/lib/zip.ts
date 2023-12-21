export function zip<A1 extends any[], A2 extends any[]>(a1: A1, a2: A2) {
    return a1.map((key, idx) => [key, a2[idx]]);
}