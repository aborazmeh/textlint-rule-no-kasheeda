import type { TextlintRuleModule } from "@textlint/types";

const report: TextlintRuleModule = (context) => {
    const { Syntax, RuleError, fixer, report, getSource, locator } = context;
    return {
        [Syntax.Str](node) { // "Str" node
            const text = getSource(node); // Get text
            const matches = text.matchAll(/ـ+/g);

            for (const match of matches) {
                const index = match.index ?? 0;
                const matchRange = [index, index + match[0].length] as const;
                const remove = fixer.removeRange(matchRange);

                const ruleError = new RuleError("Found kasheeda.", {
                    padding: locator.range(matchRange),
                    fix: remove,
                });
                report(node, ruleError);
            }
        }
    }
};

export default {
    linter: report,
    fixer: report
};
