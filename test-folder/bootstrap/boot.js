function accum(s) {
    return s
        .split('')
        .map((char, index) => char.toUpperCase() + char.toLowerCase().repeat(index))
        .join('-');
}


console.log(accum("abcd"));     
console.log(accum("RqaEzty"));
console.log(accum("cwAt"));   


function removeDuplicates(arr) {
    const seen = new Set();
    const result = [];

    arr.forEach(num => {
        if (!seen.has(num)) {
            seen.add(num);
            result.push(num);
        }
    });

    return result;
}