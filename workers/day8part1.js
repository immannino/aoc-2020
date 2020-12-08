self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    const lines = testData.split('\n');
    
    let callStackIndexMap = {};

    // accumulator
    let result = 0;

    // Stack Pointer
    let index = 0;

    // Break while loop
    let hasDuplicateVal = false;

    while(!hasDuplicateVal) {
        const [op, val] = lines[index].split(' ');

        if (callStackIndexMap[index]) {
            hasDuplicateVal = true;
            break;
        } else {
            callStackIndexMap[index] = op;
        }

        switch (op) {
            case 'acc':
                result += Number(val);
                index += 1;
                break;
            case 'jmp':
                index += Number(val);
                break;
            case 'nop':
                index += 1;
                break;
            default:
        }
    }

    const temp = Number(Date.now()) - startTime;

    self.postMessage({
        day: day,
        part: part,
        endTime: `${Math.fround(temp / 1000).toFixed(3)}s`,
        result: result
    });
};