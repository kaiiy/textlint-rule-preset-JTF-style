// LICENSE : MIT
"use strict";
/*
2.1.6.カタカナの長音
カタカナ語の末尾の長音は原則として省略しません。
カタカナの長音表記のルールについては、『外来語(カタカナ)表記ガイドライン第 2 版』(テクニカルコミュニケ ーター協会、2008 年)に従います。
『日本語スタイルガイド』(テクニカルコミュニケーター協会編著)の 207 ペ ージ「付録 2 外来語(カタカナ)表記ガイドライン」も参考にします。
*/
import {isUserWrittenNode} from "./util/node-util";
import prh from "textlint-rule-prh";
import path from "path";
export default function (context) {
    // 辞書ベースのカタカナ末尾の長音のチェックを行う
    return prh(context, {
        rulePaths: [path.join(__dirname, "..", "dict", "2.1.6.yml")]
    });
}