self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    const lines = testData.split('\n');
    const seatData = lines.map(line => line.split(''));
    
    let layout = {
        patrons: seatData,
        rowLength: seatData[0].length,
        moves: 0
    }
    
    let result = 0;

    layout = shufflePatrons(layout);

    while (layout.moves !== 0) {
        layout = shufflePatrons(layout);
    }

    layout.patrons.forEach(p => {
        result += p.filter(e => e === '#').length;
    });

    function shufflePatrons({ patrons, rowLength, moves }) {
        moves = 0;

        let tempPatrons = JSON.parse(JSON.stringify(patrons));

        for (let row = 0; row < patrons.length; row++) {
            for (let col = 0; col < rowLength; col++) {
                const seat = patrons[row][col];

                if ( seat === 'L' || seat === '#') {
                    const occupiedCount = getOccupiedCount(patrons, row, col);
                    
                    if (seat === '#' && occupiedCount >= 4) {
                        tempPatrons[row][col] = 'L';
                        moves += 1;
                    }
                    
                    if (seat === 'L' && occupiedCount === 0) {
                        tempPatrons[row][col] = '#';
                        moves += 1;
                    }
                }
            }
        }

        return { patrons: tempPatrons, moves, rowLength };
    }

    function getOccupiedCount(input, row, col) {
        let matrix = [
            input[row][col - 1],     // left
            input[row][col + 1],     // right
        ];

        if (input[row - 1]) {
            matrix.push(...[
                input[row - 1][col - 1], // top left
                input[row - 1][col],     // top
                input[row - 1][col + 1], // top right
            ]);
        }

        if (input[row + 1]) {
            matrix.push(...[
                input[row + 1][col - 1], // bottom left
                input[row + 1][col],     // bottom
                input[row + 1][col + 1], // bottom right
            ]);
        }

        const count = matrix.filter(e => e && e === '#').length;
        return count;
    }


    const temp = Number(Date.now()) - startTime;

    self.postMessage({
        day: day,
        part: part,
        endTime: `${Math.fround(temp / 1000).toFixed(3)}s`,
        result: result
    });
};


