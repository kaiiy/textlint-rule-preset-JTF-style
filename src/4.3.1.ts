// LICENSE : MIT
"use strict";
/*
4.3.1.丸かっこ（）
直前の内容を補足して説明する場合や言い換える場合に使用します。
全角のかっこを使用します
 */
import { isUserWrittenNode } from "./util/node-util";
import { matchCaptureGroupAll } from "match-index";
import regx from "regx";
import { japaneseRegExp } from "./util/regexp";
const rx = regx("g");
import type { TextlintRuleContext } from "@textlint/types";
import type { TxtNode } from "@textlint/ast-node-types";

const replaceSymbol = (symbol: string) => {
    if (symbol === "(") return "（";
    else if (symbol === ")") return "）";
    else throw new Error("fail to replace symbol");
};

const reporter = (context: TextlintRuleContext) => {
    const { Syntax, RuleError, report, fixer, getSource } = context;
    return {
        [Syntax.Str](node: TxtNode) {
            if (!isUserWrittenNode(node, context)) {
                return;
            }
            // 半角のかっこ()は使用しないで全角のかっこを使用する
            const text: string = getSource(node);

            // TODO: ()内に日本語を1文字でも含んでいる場合に変更
            // (ascii) -> そのまま
            // (日本語) -> キャプチャ
            // (ascii+日本語) -> キャプチャ
            // (）の半角全角混合パターンに注意
            const matchRegExps: RegExp[] = [
                // FIXME: https://github.com/textlint-ja/textlint-rule-preset-JTF-style/issues/79
                // rx`([\(\)])(?:${japaneseRegExp}+)([\(\)])`,
                // rx`([\(\)])(?:${japaneseRegExp})`,
                rx`(?:${japaneseRegExp})([\(\)])`
            ];
            matchRegExps.forEach((matchRegExp: RegExp) => {
                matchCaptureGroupAll(text, matchRegExp).forEach((match) => {
                    const { index, text } = match;
                    report(
                        node,
                        new RuleError("半角のかっこ()が使用されています。全角のかっこ（）を使用してください。", {
                            index: index,
                            fix: fixer.replaceTextRange([index, index + 1], replaceSymbol(text))
                        })
                    );
                });
            });
        }
    };
};

module.exports = {
    linter: reporter,
    fixer: reporter
};
