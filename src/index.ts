import type { TextlintRuleModule } from "@textlint/types";
import { TxtNode } from "@textlint/ast-node-types";

export interface Options {
    skip?: string[];
}

function getParents(node: TxtNode) {
    const result = [];
    let parent = node.parent;
    while (parent != null) {
        result.push(parent);
        parent = parent.parent;
    }
    return result;
}

function isChildNode(node: TxtNode, types: string[]) {
    const parents = getParents(node);
    const parentsTypes = parents.map(function (parent) {
        return parent.type;
    });
    return types.some(function (type) {
        return parentsTypes.some(function (parentType: string) {
            return parentType === type;
        });
    });
}

function normalize(text: string) {
    const replaces = {
        ﹱ: "ـً",
    };
    for (const [key, value] of Object.entries(replaces)) {
        const regex = new RegExp(key, "g");
        text = text.replace(regex, value);
    }
    return text;
}

const report: TextlintRuleModule<Options> = (context, options = {}) => {
    const { Syntax, RuleError, fixer, report, getSource, locator } = context;
    const skip = options.skip ?? [];
    return {
        [Syntax.Str](node) {
            // "Str" node
            if (
                isChildNode(
                    node,
                    skip.map((rule) => Syntax[rule as keyof typeof Syntax])
                )
            ) {
                return;
            }

            const text = getSource(node); // Get text
            const matches = normalize(text).matchAll(/ـ+/g);
            const notLetter = (index: number) => /[^\p{Letter}]/u.test(text[index]);

            for (const match of matches) {
                const index = match.index ?? 0;
                const matchRange = [index, index + match[0].length] as const;
                if (
                    index === 0 ||
                    index + match[0].length === text.length ||
                    notLetter(index - 1) ||
                    notLetter(index + match[0].length)
                ) {
                    return;
                }
                const remove = fixer.removeRange(matchRange);

                const ruleError = new RuleError("Found kasheeda.", {
                    padding: locator.range(matchRange),
                    fix: remove,
                });
                report(node, ruleError);
            }
        },
    };
};

export default {
    linter: report,
    fixer: report,
};
