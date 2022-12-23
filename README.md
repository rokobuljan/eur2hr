# EUR 2 HR - Convert EURO (€) value to Croatian words (*višerječnice*)

Useful when in need to show the money amount in words like i.e:

> **Iznos:** *121024.05 €*  
> **Slovima:** *stodvadesetjednatisućadvadesetčetiri eura i pet centi*

## Install

```sh
npm i @rbuljan/eur2hr
```

## Usage

```js
import eur2hr from "@rbuljan/eur2hr";
const words = eur2hr(1042.31);

console.log(words);
```

> jednatisućačetrdesetdva eura i tridesetjedan cent

```js
import eur2hr from "@rbuljan/eur2hr";
const words = eur2hr(1042.31, { simple: true });
```

> tisućučetrdesetdva eura i tridesetjedan cent

```js
import eur2hr from "@rbuljan/eur2hr";
const words = eur2hr(1042.31, { simple: true, delimiter: " " });
```

> tisuću četrdeset dva eura i trideset jedan cent

## Syntax

```js
eur2hr(number [, {options}])
```

Returns a **String**, with the the Croatian representation of money as words.   
Returns String `"Error"` if the input number is greater than `1e13` (`10_000_000_000_000.00`) 

## Arguments

#### number (String|Number)

`number` is a float **String** or **Number**

#### options (Object)

| Property  | Type    | Default | Description                                                                  |
| --------- | ------- | ------- | ---------------------------------------------------------------------------- |
| delimiter | String  | `""`    | Use i.e. `" "` to delimit words with space                                        |
| simple    | Boolean | `false` | Set to true to remove unnecessary *"jedan/na"* for round *thousands* numbers |

## Test

To create a readable `test.txt` file with your test results, edit the `test.js` variables and run:  

```sh
node test  # Find the results in ./test.txt
```

## Licence

MIT
