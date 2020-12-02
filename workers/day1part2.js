
self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;
    let hasMatch = false;
    let final = 0;

    for (let k = 0; k < testData.length; k++) {
        for (let z = 0; z < testData.length; z++) {
            for (let y = 0; y < testData.length; y++) {
                const result = Number(testData[k]) + Number(testData[z]) + Number(testData[y]);
                if (result === 2020) {
                    console.log(`Match found - Index1: ${k} Num1: ${testData[k]}, Index2: ${z}, Num2: ${testData[z]})`);
                    hasMatch = true;
                    final = Number(testData[k]) * Number(testData[z]) * Number(testData[y]);
                    break;
                }
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