// because TemplateStringArray only supports normal strings
export type TypedTemplateStringArray<T extends Array<string>> = ReadonlyArray<T[number]> & { raw: readonly T[number][] }

export type Split<S extends string, C extends string> = S extends `${infer Head}${C}${infer Tail}` ? [Head, ...Split<Tail, C>] : [S]
export type Join<A extends string[], C extends string> = A extends [infer Head extends string, ...infer Tail extends string[]] ? `${Head}${C}${Join<Tail, C>}` : `${A[0]}`;