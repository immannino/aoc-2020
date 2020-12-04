self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    const lines = testData.split('\n\n');

    let result = 0;

    for (let line of lines) {
        if (validate(line)) {
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

/**
 * valiate passport pseudo rules engine
 * ------------------------------------
 * This method verifys and validates the required passport
 * fields as compliant with non-North Pole Credentials.
 */
function validate(input) {
    const { byr, iyr, eyr, hgt, hcl, ecl, pid } = parseFields(input);
    
    return (birthYearRule(byr) &&
           issueYearRule(iyr) &&
           expirationYearRule(eyr) &&
           heightRule(hgt) &&
           hairColorRule(hcl) &&
           eyeColorRule(ecl) && 
           passwordIdRule(pid));
}

/**
 * (Birth Year) - four digits; at least 1920 and at most 2002.
 * @param {*} value 
 */
function birthYearRule(value) {
    if (!value) return false;

    return Number(value) >= 1920 && Number(value) <= 2002;
}

/**
 * (Issue Year) - four digits; at least 2010 and at most 2020.
 * @param {*} value 
 */
function issueYearRule(value) {
    if (!value) return false;

    return Number(value) >= 2010 && Number(value) <= 2020;
}

/**
 * (Expiration Year) - four digits; at least 2020 and at most 2030.
 */
function expirationYearRule(value) {
    if (!value) return false;

    return Number(value) >= 2020 && Number(value) <= 2030;
}

/**
 * (Height) - a number followed by either cm or in:
 *   - If cm, the number must be at least 150 and at most 193.
 *   - If in, the number must be at least 59 and at most 76.
 */
function heightRule(value) {
    if (!value) return false;

    const unit = String(value).substring(String(value).length - 2);

    if (unit !== 'cm' && unit !== 'in') return false;

    const numVal = Number(String(value).substring(0, String(value).length - 2));

    if (unit === 'cm') {
        return numVal >= 150 && numVal <= 193;
    }

    if (unit === 'in') {
        return numVal >= 59 && numVal <= 76;
    }

    return false;
}

/**
 * (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
 */
function hairColorRule(value) {
    if (!value) return false;

    const regex = new RegExp('#(?:[0-9a-fA-F]{3}){1,2}$');
    return regex.test(String(value));
}

/**
 * (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
 */
function eyeColorRule(value) {
    if (!value) return false;
    
    const temp = String(value);;

    return temp === 'amb' ||
           temp === 'blu' ||
           temp === 'brn' ||
           temp === 'gry' ||
           temp === 'grn' ||
           temp === 'hzl' ||
           temp === 'oth';
}

/**
 * (Passport ID) - a nine-digit number, including leading zeroes.
 */
function passwordIdRule(value) {
    if (!value) return false;

    const regex = /^\d{9}$/;
    return regex.test(value);
}

function parseFields(input) {
    let tempFields = {
        byr: null,
        iyr: null,
        eyr: null,
        hgt: null,
        hcl: null,
        ecl: null,
        pid: null
    }

    const fields = input.split('\n').join(' ').split(' ');

    for (let field of fields) {
        const [key, value] = field.split(':');

        switch(key) {
            case 'byr':
                tempFields.byr = value;
                break;
            case 'iyr':
                tempFields.iyr = value;
                break;
            case 'eyr':
                tempFields.eyr = value;
                break;
            case 'hgt':
                tempFields.hgt = value;
                break;
            case 'hcl':
                tempFields.hcl = value;
                break;
            case 'ecl':
                tempFields.ecl = value;
                break;
            case 'pid':
                tempFields.pid = value;
                break;
            default:
                break;
        }
    }

    return tempFields;
}