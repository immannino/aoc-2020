self.onmessage = async ({ data }) => {
    const { day, part, startTime, testData } = data;

    const lines = testData.split('\n');
    // For a graph maybe.

    let waypoint = { x: 10, y: 1 };
    let currentCoords = { x: 0, y: 0 };
    let coords = [];
    let direction = 'E';
    let degrees = 0;

    for (let coord of lines) {
        const instruction = coord.slice(0, 1);
        const unit = Number(coord.slice(1));
        const turns = unit / 90;

        switch (instruction) {
            case 'F':
                move((waypoint.x * unit), (waypoint.y * unit));
                break;
            case 'R':
                rotateWaypointRight(turns);
                break;
            case 'L':
                rotateWaypointLeft(turns);
                break;
            case 'N':
                moveWaypoint(0, unit); // Good
                break;
            case 'S':
                moveWaypoint(0, -1 * unit); // Good
                break;
            case 'E':
                moveWaypoint(unit, 0); // Good
                break;
            case 'W':
                moveWaypoint(-1 * unit, 0); // Good
                break;
            default:
        }
    }

    let result = Math.abs(currentCoords.x) + Math.abs(currentCoords.y);

    const temp = Number(Date.now()) - startTime;

    function moveWaypoint(x, y) {
        waypoint.x += x;
        waypoint.y += y;

        if (waypoint.x >= 0 && waypoint.y >= 0) { // east
            direction = 'E';
        } else if (waypoint.x < 0 && waypoint.y <= 0) { // West
            direction = 'W';
        } else if (waypoint.x <= 0 && waypoint.y > 0) { // North
            direction = 'N';
        } else if (waypoint.x >= 0 && waypoint.y < 0) { // South
            direction = 'S'
        }
    }

    function rotateWaypointLeft(turns) {
        for (let i = 0; i < turns; i++) {
            const { x, y } = waypoint;

            if (direction === 'N') {
                direction = 'W';
                waypoint.x = -1 * Math.abs(y);
                waypoint.y = -1 * Math.abs(x);
            } else if (direction === 'W') {
                direction = 'S';
                waypoint.x = Math.abs(y);
                waypoint.y = -1 * Math.abs(x);
            } else if (direction === 'S') {
                direction = 'E';
                waypoint.x = Math.abs(y);
                waypoint.y = Math.abs(x);
            } else if (direction === 'E') {
                direction = 'N';
                waypoint.x = -1 * Math.abs(y);
                waypoint.y = Math.abs(x);
            }
        }
    }

    function rotateWaypointRight(turns) {
        for (let i = 0; i < turns; i++) {
            const { x, y } = waypoint;
            if (direction === 'N') {
                direction = 'E';
                waypoint.x = Math.abs(y);
                waypoint.y = Math.abs(x);
            } else if (direction === 'E') {
                direction = 'S';
                waypoint.x = Math.abs(y);
                waypoint.y = -1 * Math.abs(x);
            } else if (direction === 'S') {
                direction = 'W';
                waypoint.x = -1 * Math.abs(y);
                waypoint.y = -1 * Math.abs(x);
            } else if (direction === 'W') {
                direction = 'N';
                waypoint.x = -1 * Math.abs(y);
                waypoint.y = Math.abs(x);
            }
        }
    }

    function move(x, y) {
        currentCoords.x += x;
        currentCoords.y += y;
    }

    self.postMessage({
        day: day,
        part: part,
        endTime: `${Math.fround(temp / 1000).toFixed(3)}s`,
        result: result
    });
};


