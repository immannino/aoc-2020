// Get rule for Shiny Gold Bag
let bagNodes = {

};

self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    const lines = testData.split('\n');
    
    let result = 0;

    // Changes work in progress.

    const temp = Number(Date.now()) - startTime;

    self.postMessage({
        day: day,
        part: part,
        endTime: `${Math.fround(temp / 1000).toFixed(3)}s`,
        result: result
    });
};

function buildBagGraph(lines) {
    for (let line of lines) {
        const [color, rule] = line.split(' bags contain ');
        let values = rule.split('.')[0];

        const parentKey = trimParentKey(name);
        
        bags[parentKey] = {}

        if (values !== 'no other bags') {
            values = values.split(', ');

            for (let val of values) {
                const number = String(val).trim().substring(0, 1);
                const keyName = trimKey(val);

                bags[parentKey][keyName] = number;
            }   
        } else {
            bags[parentKey] = false;
        }
    }
}

class BagNode {
    constructor(color, contains, numContains) {

    }

    carries(bagColor) {
        if (this.color === bagColor) {
            return true;
        }

        let hasMatch = false;

        for (let bag of this.contains) {
            hasMatch = hasMatch || bag.carries(bagColor);
        }

        return hasMatch;
    }

    count() {
        let count = 0;

        for (let i in this.contains) {
            count += this.numContains[i] * this.contains[i].count();
        }

        return count;
    }
}

// Too lazy to refactor these methods, but just trims the inputs.

function trimKey(key) {
    let keyName = String(key).trim().substring(2);
    
    if (keyName.charAt(keyName.length - 1) === 's') {
        keyName = keyName.substring(0, keyName.length - 1);
    }
    
    return keyName;
}

function trimParentKey(key) {
    let keyName = String(key).trim();
    
    if (keyName.charAt(keyName.length - 1) === 's') {
        keyName = keyName.substring(0, keyName.length - 1);
    }
    
    return keyName;
}