export function sumNumberList(list: number[]) {
    let sum = 0;
    for (let n of list) {
        sum += n;
    }
    return sum;
}