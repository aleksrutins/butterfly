export function invariant(condition: any | null | undefined, message: string) {
    if(!condition) throw new Error(`invariant fail: ${message}`);
}

export function expect<T>(obj: T | null | undefined, message: string) {
    if(!obj) throw new Error(`expectation failed: ${message}`);
    return obj;
}