export const deepClone = (src) => {
    const target = Array.isArray(src) ? [] : {};
    for (const prop in src) {
        const value = src[prop];
        target[prop] = value && typeof value === 'object' ? deepClone(value) : value;
    }
    return target;
}

export default deepClone;