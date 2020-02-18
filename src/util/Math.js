export default {
    calculateRangePercentage: (min, max, result) => {
        let range = max - min;
        let traversal = result - min;
        return Math.floor((traversal * 100) / range);
    }
}
