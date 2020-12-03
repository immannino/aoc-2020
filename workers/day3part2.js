self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;


    const part2Promises = await Promise.all([
        traverse({ right: 1, down: 1 }, testData),
        traverse({ right: 3, down: 1 }, testData),
        traverse({ right: 5, down: 1 }, testData),
        traverse({ right: 7, down: 1 }, testData),
        traverse({ right: 1, down: 2 }, testData),
    ]);

    const result = part2Promises.reduce((m, n) => m * n);

    const temp = Number(Date.now()) - startTime;

    self.postMessage({
        day: day,
        part: part,
        endTime: `${Math.fround(temp / 1000).toFixed(3)}s`,
        result: result
    });
};

async function traverse({ right, down }, data) {
    let tempCoords = [down, right];
    let trees = 0;

    for (let i = 0; i < data.length; i++) {
        const [x, y] = [...tempCoords];
        const encounter = String(data[x]).charAt(y % String(data[x]).length);
    
        if (encounter === '#') {
            trees += 1;
        }
    
        tempCoords = [x + down, y + right]; 
    }

    return trees;
}