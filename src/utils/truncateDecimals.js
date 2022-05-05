export const truncateDecimals = (value, decimals) => {
    const parts = value.toString().split('.')

    if (parts.length === 2) {
        return Number([parts[0], parts[1].slice(0, decimals)].join('.'))
    } else {
        return Number(parts[0]);
    }
}