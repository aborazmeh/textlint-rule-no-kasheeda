# textlint-rule-no-kasheeda [![Actions Status: test](https://github.com/aborazmeh/textlint-rule-no-kasheeda/workflows/test/badge.svg)](https://github.com/aborazmeh/textlint-rule-no-kasheeda/actions?query=workflow%3A"test") [![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)

textlint rule to prevents the usage of kasheeda (or Tatweel in Arabic) `ـ` U+0640 symbol in languages like Arabic and Farsi

## Fixable

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/) 

```
textlint --rule no-kasheeda --fix README.md
```
## Example

> يـولد جميع الناس أحراراً ومتـــســـاوين في الكرامة والحقوق

> يـولد جميع الناس أحراراً ومتساوين في الكرامة والحقوق

Kasheedas usage is acceptable when it's not surrounded by letters on each sides:

> العام السابق 1445 هـ، والعام الحالي 1446 هـ

> خَرَجتَ من المُنى مثلَ الـ  * * * ـحُمَيِّرِ غَرَّهُ وَتِدُه

> وعندما جاء إلى الـ«بيت» دخل الـ"غرفة" ولم يجد أحداً


## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-no-kasheeda

## Usage

Via `.textlintrc.json`(Recommended)

```json
{
    "rules": {
        "no-kasheeda": true
    }
}
```

Via CLI

```
textlint --rule no-kasheeda README.md
```
### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## License

MIT © aborazmeh
