self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    const array = testData.split('\n');
    const adapters = array.map(e => Number(e)).sort((a,b) => a - b);

    /**
     * Idea:
     * 
     * Build a graph similar to day 8?
     * 
     * and then BFS through each iteration keeping track of count of iterations or possible paths
     * 
     * 1. Create Node type
     * 2. Build Graph
     * 3. Run DFS against it. 
     * 
     * Ugh. I am no good at this need to refresh/relearn.
     * 
     * https://codeburst.io/implementing-dfs-and-bfs-using-javascript-5034f3cee9a1
     * 
     */

    let result = 0;

    let possibleMoveCount = [];
    
    for (let i = 0; i < adapters.length; i++) {
        let tempCount = 0;
        // console.log({ i, a: adapters[i], b: adapters[i + 1] });
        if (isValidMove(adapters[i], adapters[i + 1])) {
            console.log({ c: adapters[i], one: adapters[i + 1] });
            tempCount += 1;
        }

        if (isValidMove(adapters[i], adapters[i + 2])) {
            console.log({ c: adapters[i], two: adapters[i + 2] });
            tempCount += 1;
        }

        if (isValidMove(adapters[i], adapters[i + 3])) {
            console.log({ c: adapters[i], three: adapters[i + 3] });
            tempCount += 1;
        }

        if (tempCount) {
            possibleMoveCount.push(tempCount);
        }
    }

    result = possibleMoveCount.reduce((a,b) => a * b);

    
    function isValidMove(curr, next) {
        return (next - curr) === 1 ||
               (next - curr) === 2 ||
               (next - curr) === 3;
    }

    const temp = Number(Date.now()) - startTime;

    self.postMessage({
        day: day,
        part: part,
        endTime: `${Math.fround(temp / 1000).toFixed(3)}s`,
        result: result
    });
};


