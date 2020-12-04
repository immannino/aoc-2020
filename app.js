new Vue({
    el: '#app',
    data: {
        message: 'Hehe',
        days: {},
        dayNames: [
            '--- Day 1: Report Repair ---',
            '--- Day 2: Password Philosophy ---',
            '--- Day 3: Toboggan Trajectory ---',
            '--- Day 4: Passport Processing ---',
            '--- Day 5: ---',
            '--- Day 6: ---',
            '--- Day 7: ---',
            '--- Day 8: ---',
            '--- Day 9: ---',
            '--- Day 10: ---',
            '--- Day 11: ---',
            '--- Day 12: ---',
            '--- Day 13: ---',
            '--- Day 14: ---',
            '--- Day 15: ---',
            '--- Day 16: ---',
            '--- Day 17: ---',
            '--- Day 18: ---',
            '--- Day 19: ---',
            '--- Day 20: ---',
            '--- Day 21: ---',
            '--- Day 22: ---',
            '--- Day 23: ---',
            '--- Day 24: ---',
            '--- Day 25: ---',
        ],
        allRunning: false,
        userTestData: null,
        userTestDataHasInput: false,
        userTestDataHasError: null
    },
    async mounted() {
        // init to how many puzzles have been solved.
        await this.init(4);

        // Seems to not reactively update on its own
        // since populating nested objects.
        this.$forceUpdate();
    },
    methods: {
        async runAll() {
            this.allRunning = true;

            await Promise.all[
                this.run(1,1),
                this.run(1,2),
                this.run(2,1),
                this.run(2,2),
                this.run(3,1),
                this.run(3,2),
                this.run(4,1),
                this.run(4,2)
            ];

            this.allRunning = false;
        },
        init(days) {
            for (let i = 1; i <= days; i++) {

                this.days[`${i}`] = {
                    data: null,
                    dataUrl: `data/day${i}.txt`,
                    name: this.dayNames[i - 1],
                    errMessage: null,
                    '1': {
                        result: null,
                        time: null,
                        running: false,
                        workerUrl: `day${i}part1.js`,
                        worker: null
                    },
                    '2': {
                        result: null,
                        time: null,
                        running: false,
                        workerUrl: `day${i}part2.js`,
                        worker: null
                    }
                }
            }
        },
        async run(day, part, testData = null) {
            const startTime = Date.now();
            this.days[day][part].running = true;

            if (testData) {
                this.days[day].data = testData;
            } else if (!this.days[day].data) {
                const response = await fetch(this.days[day].dataUrl);
                this.days[day].data = await response.text();
            }

            this.days[day][part].worker = new Worker(`workers/${this.days[day][part].workerUrl}`);

            this.days[day][part].worker.postMessage({
                day: day,
                part: part,
                startTime: startTime,
                testData: this.days[day].data
            });

            this.days[day][part].worker.onmessage = (ev) => {
                const { day, part, endTime, result } = ev.data;

                this.days[day][part].running = false;
                this.days[day][part].time = endTime;
                this.days[day][part].result = result;
                this.$forceUpdate();
            }
        },
        getEndTime(start) {
            const temp = new Date(Date.now - start);
            return `${Math.fround(temp / 1000)}s`;
        },
        handleUserTestDataUpload(ev) {
            this.userTestDataHasError = null;
            this.userTestDataHasInput = false;

            const file = ev.target.files[0];

            if (file) {
                var reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = (evt) => {
                    this.userTestData = evt.target.result.split('\n');
                    this.userTestDataHasInput = true;
                }
                reader.onerror = (evt) => {
                    this.userTestDataHasError = 'Error reading in file. Please try again.';
                }
            }
        },
        async runUserTest(day) {
            // reset run metadata
            this.days[day]['1'].result = null;
            this.days[day]['1'].time = null;
            this.days[day]['2'].result = null;
            this.days[day]['2'].time = null;

            this.$forceUpdate();

            // run both parts.
            await Promise.all([
                this.run(day, '1', this.userTestData),
                this.run(day, '2', this.userTestData)
            ])
        }
    }
})