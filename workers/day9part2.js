self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    const input = testData.split('\n');
    const lines = input.map(i => Number(i));
    
    // Re run solution from Part 1, to get Target for part 2
    let targetSum = 0;
    let preambleLength = 25;

    for (let i = preambleLength; i <= lines.length; i++) {
        const preamble = lines.slice(i - preambleLength, i);
        const next = lines[i];
        const listOfSums = await buildSumList(preamble);

        if (!listOfSums.has(next)) {
            targetSum = next;
            break;
        }
    }

    async function buildSumList(items) {
        let sumList = new Set();

        for (let i in items) {
            for (let j in items) {
                if (i !== j) {
                    sumList.add(items[i] + items[j]);
                }
            }
        }

        return sumList;
    }

    // Part 2:
    // Find which numbers add up to the sum.

    let result = 0;

    for (let i in lines) {
        const hasMatch = hasSumMatch(Number(i), targetSum);

        if (hasMatch) {
            const segment = lines.slice(hasMatch.start, hasMatch.end);
            const min = Math.min(...segment);
            const max = Math.max(...segment);

            result = min + max;
            break;
        }
    }

    function hasSumMatch(start, target) {
        let index = start;
        let current = 0;

        while (current < target) {
            current = current + lines[index];
            index += 1;
        }

        if (current === target) {
            return  { start, end: index };
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


