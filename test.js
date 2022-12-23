import eur2hr from "./eur2hr.js";
import fs from "node:fs";
let result = "";

const convertOptions = {
    delimiter: " ",
    simple: false,
};

// TEST custom:
// result += eur2hr(1234567.45, convertOptions) + "\n";

// TEST loop:
let step = 0;
for (let i = 0; i < 250; ++i) {
    const num = step;
    result += num.toFixed(2) + " \t " + eur2hr(num, convertOptions) + "\n";
    step += 0.01;
    step *= 1.15;
}

fs.writeFileSync("test.txt", result);
