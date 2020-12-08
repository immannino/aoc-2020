self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    const lines = testData.split('\n');
    
    let result = 0;

    const temp = Number(Date.now()) - startTime;

    self.postMessage({
        day: day,
        part: part,
        endTime: `${Math.fround(temp / 1000).toFixed(3)}s`,
        result: result
    });
};


