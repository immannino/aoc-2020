
self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;
    let hasMatch = false;
    let final = 0;

    const lines = testData.split('\n');

    for (let k = 0; k < lines.length; k++) {
        for (let z = 0; z < lines.length; z++) {
            const result = Number(lines[k]) + Number(lines[z]);
            if (result === 2020) {
                hasMatch = true;
                final = Number(lines[k]) * Number(lines[z]);
                break;
            }
        }

        if (hasMatch) break;
    }
    
    const temp = Number(Date.now()) - startTime;

    self.postMessage({
        day: day,
        part: part,
        endTime: `${Math.fround(temp / 1000).toFixed(3)}s`,
        result: final
    });
}