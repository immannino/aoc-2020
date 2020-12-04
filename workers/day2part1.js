self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    const lines = testData.split('\n');

    let inputs = [];

    for (let line of lines) {
        let [minMax, l, pw] = line.split(' ');

        const [min, max] = minMax.split('-');
        const letter = l.slice(0,1);

        inputs.push({
            min: Number(min),
            max: Number(max),
            letter: letter,
            password: pw
        });
    }

    let pwCount = 0;

    for (let { min, max, letter, password } of inputs) {
        let letterMap = {};

        password.split('').forEach(l => letterMap[l] ? letterMap[l] += 1 : letterMap[l] = 1);

        if (letterMap[letter] && letterMap[letter] >= min && letterMap[letter] <= max) {
            pwCount += 1;
        }
    }

    const temp = Number(Date.now()) - startTime;

    self.postMessage({
        day: day,
        part: part,
        endTime: `${Math.fround(temp / 1000).toFixed(3)}s`,
        result: pwCount
    });
};


