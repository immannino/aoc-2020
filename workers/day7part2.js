let bagNodes = {

};

self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    const lines = testData.split('\n');
    
    buildBagGraph(lines);

    const result = bagNodes["shiny gold"].count() - 1;

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

        const parentColor = trimParentKey(color);
        
        if (!bagNodes[parentColor]) {
            bagNodes[parentColor] = new BagNode(color);
        }

        if (values !== 'no other bags') {
            values = values.split(', ');

            for (let val of values) {
                const number = String(val).trim().substring(0, 1);
                const childColor = trimKey(val);

                if (!bagNodes[childColor]) {
                    bagNodes[childColor] = new BagNode(childColor);
                }

                bagNodes[parentColor].contains.push(bagNodes[childColor]);
                bagNodes[parentColor].numContains.push(Number(number));
            }
        }
    }
}

class BagNode {
    constructor(color, contains = [], numContains = []) {
        this.color = color;
        this.contains = contains;
        this.numContains = numContains;
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
        let count = 1;

        for (let i in this.contains) {
            count += this.numContains[i] * this.contains[i].count();
        }

        return count;
    }
}

// Too lazy to refactor these methods, but just trims the inputs.

function trimKey(key) {
    let keyName = String(key).trim().substring(2).split(' bag')[0];
    
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