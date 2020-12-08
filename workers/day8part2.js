self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    const lines = testData.split('\n');
    const instructions = parseLines(lines);

    // accumulator
    let result = execute(instructions);

    function parseLines(lines) {
        let instructions = [];

        for (let line of lines) {
            const [op, val] = line.split(' ');
            const numVal =  Number(val);

            instructions.push({ op, val: numVal });
        }

        return instructions;
    }

    function execute(instructions) {
        let r = 0; // accumulator
        let i = 0; // Stack Pointer

        // Break while loop
        while (i < instructions.length) {
            const { op, val } = instructions[i];
            let tempR = 0;

            switch (op) {
                case 'acc':
                    r += val;
                    i += 1;
                    break;
                case 'jmp':
                    instructions[i].op = 'nop';
                    tempR = simulate(i, r, instructions);

                    if (tempR) {
                        return tempR;
                    }

                    instructions[i].op = 'jmp';
                    i += val;
                    break;
                case 'nop':
                    instructions[i].op = 'jmp';
                    tempR = simulate(i, r, instructions);

                    if (tempR) {
                        return tempR;
                    }

                    instructions[i].op = 'nop';
                    i += 1;
                    break;
                default:
            }
        }
        return null;
    }

    function simulate(i, r, instructions) {
        let seen = new Set();
        
        while (i < instructions.length && !seen.has(i)) {
            seen.add(i);
            const { op, val } = instructions[i];

            switch (op) {
                case 'acc':
                    r += val;
                    i += 1;
                    break;
                case 'jmp':
                    i += val;
                    break;
                case 'nop':
                    i += 1;
                    break;
                default:
            }
        }

        if (i === instructions.length) {
            return r;
        }

        return null;
    }

    const temp = Number(Date.now()) - startTime;

    self.postMessage({
        day: day,
        part: part,
        endTime: `${Math.fround(temp / 1000).toFixed(3)}s`,
        result: result
    });
};