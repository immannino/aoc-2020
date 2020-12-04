self.onmessage = async ({data}) => {
    const { day, part, startTime, testData } = data;

    const lines = testData.split('\n\n');

    let result = 0;

    for (let line of lines) {
        if (validateFields(line)) {
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
 * Validate that the password contains the following fields
 * 
 * byr (Birth Year)
 * iyr (Issue Year)
 * eyr (Expiration Year)
 * hgt (Height)
 * hcl (Hair Color)
 * ecl (Eye Color)
 * pid (Passport ID)
 * cid (Country ID)
 */
function validateFields(input) {
    const field = String(input);

    return field.includes('byr:') && 
           field.includes('iyr:') && 
           field.includes('eyr:') && 
           field.includes('hgt:') && 
           field.includes('hcl:') && 
           field.includes('ecl:') && 
           field.includes('pid:');
}