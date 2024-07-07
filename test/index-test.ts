import TextLintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextLintTester();
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
    valid: [
        "يولد جميع الناس أحراراً ومتساوين في الكرامة والحقوق"
    ],
    invalid: [
        {
            text: "يـولد جميع الناس أحراراً ومتساوين في الكرامة والحقوق",
            errors: [
                {
                    message: "Found kasheeda.",
                    range: [1, 2]
                }
            ]
        },
        {
            text: `يـولد جميع الناس أحراراً ومتـــســـاوين في الكرامة والحقوق`,
            errors: [
                {
                    message: "Found kasheeda.",
                    range: [1, 2]
                },
                {
                    message: "Found kasheeda.",
                    range: [28, 31]
                },
                {
                    message: "Found kasheeda.",
                    range: [32, 35]
                }
            ]
        },

    ]
});
