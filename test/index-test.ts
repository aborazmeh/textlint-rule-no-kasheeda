import TextLintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextLintTester();
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
    valid: [
        "يولد جميع الناس أحراراً ومتساوين في الكرامة والحقوق",
        "العام الحالي 1446 هـ وبعد ذلك عام جديد",
        "العام السابق 1445 هـ، والعام الحالي 1446 هـ",
        "خَرَجتَ من المُنى مثلَ الـ      ـحُمَيِّرِ غَرَّهُ وَتِدُه",
        `وعندما جاء إلى الـ«بيت» دخل الـ"غرفة" ولم يجد أحداً`,
        " this `كــود` is acceptable by default",
        "```c\n// تــعليق\n```",
        {
            text: "# مـقـدمـة",
            options: {
                skip: ["Header"],
            },
        },
    ],
    invalid: [
        {
            text: "يـولد جميع الناس أحراراً ومتساوين في الكرامة والحقوق",
            output: "يولد جميع الناس أحراراً ومتساوين في الكرامة والحقوق",
            errors: [
                {
                    message: "Found kasheeda.",
                    range: [1, 2],
                },
            ],
        },
        {
            text: `يـولد جميع الناس أحراراً ومتـــســـاوين في الكرامة والحقوق`,
            output: "يولد جميع الناس أحراراً ومتساوين في الكرامة والحقوق",
            errors: [
                {
                    message: "Found kasheeda.",
                    range: [1, 2],
                },
                {
                    message: "Found kasheeda.",
                    range: [28, 31],
                },
                {
                    message: "Found kasheeda.",
                    range: [32, 35],
                },
            ],
        },
        {
            text: "# مـقـدمـة",
            output: "# مقدمة",
            options: {
                skip: [],
            },
            errors: [
                {
                    range: [3, 4],
                },
                {
                    range: [5, 6],
                },
                {
                    range: [8, 9],
                },
            ],
        },
    ],
});
