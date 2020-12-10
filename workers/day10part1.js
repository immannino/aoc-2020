self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    const array = testData.split('\n');
    const adapters = array.map(e => Number(e)).sort((a,b) => a - b);
    
    const myAdapter = (Math.max(...adapters) + 3);

    let ones = [];
    let threes = [myAdapter];

    let result = 0;
    let current = 0;

    for (let i in adapters) {
        if ((adapters[i] - current) === 1) {
            ones.push(adapters[i]);
        } else if ((adapters[i] - current) === 3) {
            threes.push(adapters[i]);
        }

        current = adapters[i];
    }
    
    result = ones.length * threes.length;

    const temp = Number(Date.now()) - startTime;

    self.postMessage({
        day: day,
        part: part,
        endTime: `${Math.fround(temp / 1000).toFixed(3)}s`,
        result: result
    });
};


