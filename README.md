# EUR 2 HR - Convert EURO (€) value to Croatian words (*"višerječnice"*)

Useful when in need to show the money amount in words like i.e:

> **Iznos:** *121024.05 €*  
> **Slovima:** *stodvadesetjednatisućadvadesetčetiri eura i pet centi*

## Usage

```js
eur2hr(number [, {options}])
```

Returns a **String**, with the the Croatian representation of money as words, or `"Error"` 

## Arguments

#### Number 

`number` is a float **String** or **Number** (only valid up to `1E13`).

#### Options (Object)

| Property  | Type    | Default | Description                                                                  |
| --------- | ------- | ------- | ---------------------------------------------------------------------------- |
| delimiter | String  | `""`    | Use `" "` to delimit words with space                                        |
| simple    | Boolean | `false` | Set to true to remove unnecessary *"jedan/na"* for round *thousands* numbers |


## Usage

```js
import { eur2hr } from "./eur2hr.js";
const words = eur2hr(1042.31);
```

> jednatisućačetrdesetdva eura i tridesetjedan cent

```js
import { eur2hr } from "./eur2hr.js";
const words = eur2hr(1042.31, {simple: true});
```

> tisućučetrdesetdva eura i tridesetjedan cent

```js
import { eur2hr } from "./eur2hr.js";
const words = eur2hr(1042.31, {simple: true, delimiter: " "});
```

> tisuću četrdeset dva eura i trideset jedan cent

 

## Test

To create a readable `test.txt` file with your test results from `test.js`, edit the file variables and run:  

```sh
node test  # Find the results in ./test.txt
```

## Licence

MIT
