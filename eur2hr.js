/**
 * Novac pisanim slovima | Višerječnice
 * //stackoverflow.com/users/383904/roko-c-buljan
 */

const lib = [
    {
        1: ["jedan", "jedna"],
        2: ["dva", "dvije"],
        3: "tri",
        4: "četiri",
        5: "pet",
        6: "šest",
        7: "sedam",
        8: "osam",
        9: "devet",
    },
    {
        1: "jedanaest",
        2: "dvanaest",
        3: "trinaest",
        4: "četrnaest",
        5: "petnaest",
        6: "šestnaest",
        7: "sedamnaest",
        8: "osamnaest",
        9: "devetnaest",
    },
    {
        1: "deset",
        2: "dvadeset",
        3: "trideset",
        4: "četrdeset",
        5: "pedeset",
        6: "šezdeset",
        7: "sedamdeset",
        8: "osamdeset",
        9: "devedeset",
    },
    {
        1: "sto",
        2: "dvjesto",
        3: "tristo",
        4: "četiristo",
        5: "petsto",
        6: "šesto",
        7: "sedamsto",
        8: "osamsto",
        9: "devetsto",
    },
];

/**
 * Convert float number to croatian words
 * @param {number} num Float value
 * @param {object} options {delimiter: "", simple: false}
 * @returns {string} Money as words
 */
const eur2hr2 = (num, options) => {
    num = Number(parseFloat(num).toFixed(2));
    const int = parseInt(num, 10);
    if (int > 1e13) return "Error";
    const { delimiter: dlm, simple } = Object.assign({ delimiter: "", simple: false }, options);
    let th = 0; // Thousands depth
    const locOpts = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    const plur = (i, ones, x234, oth) => (/(?<!1)[234]$/.test(i) ? x234 : (i !== 11 && i % 10) === 1 ? ones : oth);
    const ones = i => (!i ? "" : (i < 3 ? lib[0][i][th % 2] : lib[0][i]) + dlm);
    const tens = i => (i < 10 ? ones(i) : i === 10 || i >= 20 ? (i % 10 ? lib[2][~~(i / 10)] + dlm + ones(i % 10) : lib[2][~~(i / 10)] + dlm) : lib[1][i % 10] + dlm);
    const huns = i => (i < 10 ? ones(i) : i < 100 ? tens(i) : lib[3][~~(i / 100)] + dlm + tens(i % 100));
    const arr = Math.abs(num).toLocaleString("en-US", locOpts).split(/[,.]/g);
    const d = +arr.pop();
    const len = arr.length;
    let res = +num < 0 ? "minus " : "";
    arr.forEach((str, idx) => {
        const i = +str;
        th = len - 1 - idx; // Thousands depth
        if (!i) return (res += len === 1 ? "nula " : ""); // Handle zeroes
        res += simple && th > 0 && i < 2 ? "" : huns(i); // If simple version don't print "jedan"'s
        if (th === 1) res += `tisuć${plur(i, simple && i === 1 ? "u" : "a", "e", "a")}` + dlm;
        else if (th === 2) res += `miliju${plur(i, "n", "na", "na")}` + dlm;
        else if (th === 3) res += `milijard${plur(i, "a", "e", "i")}` + dlm;
        else if (th === 4) res += `biliju${plur(i, "n", "na", "na")}` + dlm;
    });
    const lp = d ? tens(d) : "nula ";
    res += `${!dlm ? " " : ""}eur${plur(int, "o", "a", "a")} i ${lp}${!dlm ? " " : ""}cent${plur(d, "", "a", "i")}`;
    return res;
};

/**
 * Convert float number (EUR, Euro) to croatian words
 * @param {number|string} number float value in Euro (ideally anready in two decimals)
 * @param {object} options {delimiter:String, simple:Boolean}  
 * @return {string} Money value as words in croatian (višerječnice)
 */
const eur2hr = (number, options) => {

    // convert input String|Number back to a two decimal number
    number = Number(parseFloat(num).toFixed(2));

    // Prevent floats being out max range
    if (number > Number.MAX_VALUE) return "error";

    // Represent the input number as integer
    const integer = parseInt(number, 10);

    // User options and default fallbacks
    const delimiter = options.delimiter ?? "";
    const simple = options.simple ?? false;

    // This is to count how many "thousands" '*,000' places are we in 
    let thousands = 0;

    // Croatian language specifics
    const plurals = (i, ones, x234, oth) => (/(?<!1)[234]$/.test(i) ? x234 : (i !== 11 && i % 10) === 1 ? ones : oth);
    const ones = i => (!i ? "" : (i < 3 ? lib[0][i][th % 2] : lib[0][i]) + dlm);
    const tens = i => (i < 10 ? ones(i) : i === 10 || i >= 20 ? (i % 10 ? lib[2][~~(i / 10)] + dlm + ones(i % 10) : lib[2][~~(i / 10)] + dlm) : lib[1][i % 10] + dlm);
    const huns = i => (i < 10 ? ones(i) : i < 100 ? tens(i) : lib[3][~~(i / 100)] + dlm + tens(i % 100));

    const localizationOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };


};

export default eur2hr;
