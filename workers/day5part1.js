self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    const lines = testData.split('\n');

    let result = 0;

    const rowBit = 'B';
    const colBit = 'R';

    for (let line of lines) {
        const rowBitString = line.slice(0, 7);
        const colBitString = line.slice(7);

        const rowVal = binaryToDecimal(rowBitString, rowBit);
        const colVal = binaryToDecimal(colBitString, colBit);

        const tempVal = calculateSeatId(rowVal, colVal);

        if (tempVal > result) {
            result = tempVal;
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

function calculateSeatId(row, col) {
    return (row * 8) + col;
}

function binaryToDecimal(binary, onBit) {
    const bits = binary.split('');
    
    let decimal = 0;

    for (let i = bits.length - 1; i >= 0 ; i--) {
        const val = hasBitValue(bits[(bits.length - 1) - i], onBit);

        decimal += Math.pow(2, i) * val;
    }

    return Number(decimal);
}

function hasBitValue(val, bit) {
    return val === bit ? 1 : 0;
}


