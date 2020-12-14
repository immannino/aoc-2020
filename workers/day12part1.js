self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    const lines = testData.split('\n');
    // For a graph maybe.
    let direction = 'E';
    let degrees = 0;
    let currentCoords = { x: 0, y: 0 };
    
    for (let coord of lines) {
        const instruction = coord.slice(0, 1);
        const unit = Number(coord.slice(1));
    
        switch (instruction) {
            case 'F':
                direction === 'N' ? move(0, unit) : direction === 'S' ?
                                    move(0, -1 * unit) : direction === 'W' ?
                                    move(-1 * unit, 0) : move(unit, 0);
                break;
            case 'R':
                rotate(-1 * unit);
                break;
            case 'L':
                rotate(unit);
                break;
            case 'N':
                move(0, unit);
                break;
            case 'S':
                move(0, -1 * unit);
                break;
            case 'E':
                move(unit, 0);
                break;
            case 'W':
                move(-1 * unit, 0);
                break;
            default:
        }
    
        // console.log(currentCoords);
    }

    function move(x, y) {
        currentCoords.x += x;
        currentCoords.y += y;
    }
    
    function rotate(newDegrees) {
        let temp;
        const val = (degrees + newDegrees);
    
        if (val < 0) {
            temp = (360 + val) % 360;
            degrees = (360 + val);
        } else {
            temp = val % 360;
            degrees = val;
        }
    
        direction = temp === 90 ? 'N' : temp === 180 ? 'W' : temp === 270 ? 'S' : 'E';
    }
    
    let result = Math.abs(currentCoords.x) + Math.abs(currentCoords.y);

    const temp = Number(Date.now()) - startTime;

    self.postMessage({
        day: day,
        part: part,
        endTime: `${Math.fround(temp / 1000).toFixed(3)}s`,
        result: result
    });
};


