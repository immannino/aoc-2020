self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    // Format inputs
    let inputs = [];

    for (let line of testData) {
        let [pos, l, pw] = line.split(' ');

        const [fPos, sPos] = pos.split('-');
        const letter = l.slice(0,1);

        inputs.push({
            firstPos: Number(fPos),
            secondPos: Number(sPos),
            letter: letter,
            password: pw
        });
    }

    // solve

    let result = 0;

    for (let { firstPos, secondPos, letter, password } of inputs) {
        const first =  password.charAt(firstPos - 1);
        const second = password.charAt(secondPos - 1);

        // NOR && OR == XOR
        
        if ((letter === first || letter === second) && (letter !== first || letter !== second)) {
            result += 1;
        }
    }

    const temp = Number(Date.now()) - startTime;

    self.postMessage({
        day: day,
        part: part,
        endTime: `${Math.fround(temp / 1000).toFixed(3)}s`,
        result: result
    });
};


