self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    const lines = testData.split('\n');
    
    let seen = new Set();

    // accumulator
    let result = 0;

    // Stack Pointer
    let index = 0;

    // Break while loop
    let hasEndOfInstruction = false;

    // while(!hasEndOfInstruction) {
    //     const [opVal, val] = lines[index].split(' ');

    //     let op = opVal;
    //     let startIndex = index;

    //     callStackIndexMap[index] = op;

    //     // if (op === 'jmp' || op === 'nop') {
    //     //     const tempOp = op === 'nop' ? 'jmp' : 'nop';
    
    //     //     if (simulateMove(tempOp, val)) {
    //     //         callStackIndexMap[index] = tempOp;
    //     //         op = tempOp;
    //     //     }
    //     // }

    //     // Execute Program
    //     execute(op, val);


    //     const [tempOp, tempVal] = lines[index].split(' ');

    //     // Break Case
    //     if (index === (lines.length)) {
    //         hasEndOfInstruction = true;
    //         break;
    //     }
    // }

    function execute(op, val) {
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