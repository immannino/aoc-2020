self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    const array = testData.split('\n');
    const filtered = array.map(e => Number(e)).sort((a,b) => a - b);

    // add in the device 
    const adapters = [0, ...filtered, (filtered[filtered.length - 1] + 3)];

    /**
     * I strugged with this and ultimately adopted this solution from a guide.
     * https://dev.to/thibpat/solving-day-10-of-advent-of-code-2020-in-javascript-5ajo
     * 
     * @author thibpat
     * @repo https://github.com/tpatel/advent-of-code-2020/blob/main/day10.js
     */

    let result = 0;

    function combination(array, memo={}) {
        const key = array.join`,`;
        if(key in memo) {
            return memo[key];
        }
    
        let result = 1;
        for(let i=1; i<array.length-1; i++) {
            if(array[i+1]-array[i-1] <= 3) {
                const arr2 = [array[i-1]].concat(array.slice(i+1))
                result += combination(arr2, memo);
            }
        }
        memo[key] = result;
        return result;
    }

    result = combination(adapters);

    const temp = Number(Date.now()) - startTime;

    self.postMessage({
        day: day,
        part: part,
        endTime: `${Math.fround(temp / 1000).toFixed(3)}s`,
        result: result
    });
};


