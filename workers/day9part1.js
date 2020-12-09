self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    const lines = testData.split('\n');
    
    let result = 0;
    let preambleLength = 25;

    for (let i = preambleLength; i <= lines.length; i++) {
        const preamble = lines.slice(i - preambleLength, i);
        const next = Number(lines[i]);
        const listOfSums = await buildSumList(preamble);

        if (!listOfSums.has(next)) {
            result = next;
            break;
        }
    }

    async function buildSumList(items) {
        let sumList = new Set();

        for (let i in items) {
            for (let j in items) {
                if (i !== j) {
                    sumList.add(Number(items[i]) + Number(items[j]));
                }
            }
        }

        return sumList;
    }

    const temp = Number(Date.now()) - startTime;

    self.postMessage({
        day: day,
        part: part,
        endTime: `${Math.fround(temp / 1000).toFixed(3)}s`,
        result: result
    });
};


