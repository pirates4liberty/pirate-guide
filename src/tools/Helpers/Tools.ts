export function deepCopy<T>(source: T): T {
    return Array.isArray(source)
        ? source.map(item => deepCopy(item))
        : source instanceof Date
            ? new Date(source.getTime())
            : source && typeof source === "object"
                ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
                    // @ts-ignore
                    Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop));
                    // @ts-ignore
                    o[prop] = deepCopy(source[prop]);
                    return o;
                }, Object.create(Object.getPrototypeOf(source)))
                : source as T;
}

export function onlyUnique<T>(value: T, index: number, self: T[]) {
    return self.indexOf(value) === index;
}
