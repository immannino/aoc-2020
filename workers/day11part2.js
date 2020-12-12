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
                    
                    if (seat === '#' && occupiedCount >= 5) {
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
    
    // Part 2
    function getOccupiedCount(input, row, col) {
        let topLeft, top, topRight, left, right, bottomLeft, bottom, bottomRight;
    
        if (input[row - 1]) {
            topLeft = input[row - 1][col - 1];
            top = input[row - 1][col];
            topRight = input[row - 1][col + 1];
        }
    
        left = input[row][col - 1];
        right = input[row][col + 1];
    
        if (input[row + 1]) {
            bottomLeft = input[row + 1][col - 1];
            bottom = input[row + 1][col];
            bottomRight = input[row + 1][col + 1];
        }
    
        let seats = [];
    
        if (topLeft) {
            seats.push(findNextSeat(input, row - 1, col - 1, -1, -1));
        }
    
        if (top) {
            seats.push(findNextSeat(input, row - 1, col, 0, -1));
        }
    
        if (topRight) {
            seats.push(findNextSeat(input, row - 1, col + 1, 1, -1));
        }
    
        if (left) {
            seats.push(findNextSeat(input, row, col - 1, -1, 0));
        }
    
        if (right) {
            seats.push(findNextSeat(input, row, col + 1, 1, 0));
        }
    
        if (bottomLeft) {
            seats.push(findNextSeat(input, row + 1, col - 1, -1, 1));
        }
    
        if (bottom) {
            seats.push(findNextSeat(input, row + 1, col, 0, 1));
        }
    
        if (bottomRight) {
            seats.push(findNextSeat(input, row + 1, col + 1, 1, 1));
        }
    
        const count = seats.filter(e => e && e === '#').length;
    
        return count;
    }
    
    function findNextSeat(input, row, col, dx, dy) {
        if (input[row]) {
            const seat = input[row][col];
    
            if (!seat) {
                return null;
            } else if (seat === '#' || seat === 'L') {
                return seat;
            } else {
                return findNextSeat(input, row + dy, col + dx, dx, dy);
            }
        } else {
            return null;
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


