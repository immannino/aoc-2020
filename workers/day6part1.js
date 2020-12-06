self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    const lines = testData.split('\n\n');
    
    let result = 0;


    for (let line of lines) {
        let charMap = {};
        line.split('\n').join('').split('').forEach((char) => {
            if (!charMap[char]) {
                charMap[char] = 1;
            }
        });

        result += Object.keys(charMap).length
    }

    const temp = Number(Date.now()) - startTime;

    self.postMessage({
        day: day,
        part: part,
        endTime: `${Math.fround(temp / 1000).toFixed(3)}s`,
        result: result
    });
};


