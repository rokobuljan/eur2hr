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

const localizationOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
};

/**
 * eur2hr
 * Convert float number (EUR, Euro) to croatian words.
 * @param {number|string} number float value in Euro (ideally anready in two decimals)
 * @param {object} options {delimiter:String, simple:Boolean}  
 * @return {string} Money value as words in croatian (višerječnice)
 */
const eur2hr = (number = 0, options = {}) => {

    // convert input String|Number back to a two decimal number
    number = Number(parseFloat(number).toFixed(2));
    // Represent the input number as integer
    const integer = parseInt(number, 10);

    // Prevent out of max range
    if (integer > 1e13) {
        return "Error";
    }

    const isNegative = number < 0;

    // User options and default fallbacks
    const delimiter = options.delimiter ?? "";
    const isSimple = options.simple ?? false;

    // This is to count how many "thousands" '*,000' places are we in 
    let thousandsPointer = 0;

    /**
     * Language specifics (Croatian)
     * Depending on count and M,F,N append a specific character to a word
     * I.e: for the word cent: 1cent"" 2,3,4cent"a" 5cent"i" etc.
     * Such uses a language specific that in the case of numbers ending
     * in 2,3,4 we need a diferent suffix (therefore the x234 variable)
     * @param {number} int Integer from triplet
     * @param {string} singular Suffix for singular
     * @param {string} x234 Suffix for nums ending in 2,3,4 (except 11,12,13,14)
     * @param {string} other General suffix for all other plurals
     * @returns {string} Suffixed string word
     */
    const plural = (int, singular, x234, other) => {

        // Check of number ends in 2|3|4 but is not preceded by
        // the number 1 (i.e numbers 12, 13, 14, 112, etc)
        if (/(^|[^1])[234]$/.test(int)) {
            return x234;
        }
        // Singular, numbers ending in "1" (besides the number 11)
        else if (int !== 11 && int % 10 === 1) {
            return singular;
        }
        // all other numbers
        return other;
    };
    
    /**
     * Handle "ones" point (jedinice) from triplet "oo0"
     * @param {number} int Integer to convert to word
     * @returns {string} word from library
     */
    const ones = (int) => {
        if (int === 0) {
            return "";
        } 
        // The numbers-words lib uses array for "1" and "2"
        else if (int < 3) {
            // The `thousandsPointer % 2` is a lucky chance that every  
            // thousands increment we have a gender switch
            return lib[0][int][thousandsPointer % 2] + delimiter;
        }
        // Else, return directly a number-word from lib
        return lib[0][int] + delimiter;
    };

    /**
     * Handle "tens" point (desetinke) from triplet "o0o" 
     * @param {number} int Integer to convert to word
     * @returns {string} word from library
     */
    const tens = (int) => {
        if (int < 10) {
            return ones(int);
        }
        else if(int === 10 || int >= 20) {
            return lib[2][Math.floor(int / 10)] + delimiter + (int % 10 ? ones(int % 10) : "");
        }
        return lib[1][int % 10] + delimiter;
    }

    /**
     * Handle "huns" point (stotinke) from triplet "0oo" 
     * @param {number} int Integer to convert to word
     * @returns {string} word from library
     */
    const huns = (int) => {
        if (int < 10) {
            return ones(int);
        }
        else if (int < 100) {
            return tens(int);
        }
        return lib[3][Math.floor(int / 100)] + delimiter + tens(int % 100);
    }

    // Convert Number to Locale string i.e: "1,234,567.89"
    // and split the number into triplets and decimals i.e:  
    const triplets = Math.abs(number).toLocaleString("en-US", localizationOptions).split(/[,.]/g);

    // Extract (and remove) the decimals part from triplets
    const decimal = Number(triplets.pop());
    const tripletsLen = triplets.length;

    // Let's analyse the triplets strings array and
    // construct the final result:

    let result = isNegative ? "minus " : "";

    triplets.forEach((str, idx) => {
        const int = Number(str);
        thousandsPointer = tripletsLen - 1 - idx; // Thousands depth
        if (!int) {
            // Handle zeroes
            result += tripletsLen === 1 ? "nula " : "";
            return result; 
        }
        // If isSimple mode, don't print "jedan"'s
        result += isSimple && thousandsPointer > 0 && int < 2 ? "" : huns(int); 

        if (thousandsPointer === 1) {
            result += `tisuć${plural(int, isSimple && int === 1 ? "u" : "a", "e", "a")}` + delimiter;
        }
        else if (thousandsPointer === 2) {
            result += `miliju${plural(int, "n", "na", "na")}` + delimiter;
        }
        else if (thousandsPointer === 3) {
            result += `milijard${plural(int, "a", "e", "i")}` + delimiter;
        }
        else if (thousandsPointer === 4) {
            result += `biliju${plural(int, "n", "na", "na")}` + delimiter;
        }
        // Hopefully we don't need more than this.
    });

    const cents = decimal ? tens(decimal) : "nula ";
    result += `${!delimiter ? " " : ""}eur${plural(integer, "o", "a", "a")} i ${cents}${!delimiter ? " " : ""}cent${plural(decimal, "", "a", "i")}`;

    return result;
};

export default eur2hr;
