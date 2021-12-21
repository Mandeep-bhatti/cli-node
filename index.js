#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const chalk_1 = __importDefault(require("chalk"));
const input = process.stdin;
const output = process.stdout;
const stderr = process.stderr;
class select {
    constructor(opt = {
        options: ["names", "dates"],
        question: "what is your name",
        color: "blue",
        type: "",
        pointer: "*",
        answer: [],
    }) {
        this.indx = 0;
        this.lenth = 0;
        this.first = true;
        let { options, question, color, type, pointer, answer } = opt;
        this.options = options;
        this.question = question;
        this.answer = answer;
        this.color = color;
        this.pointer = pointer;
    }
    start() {
        let options = this.options;
        let hasFirst = this.first;
        let pointer = this.pointer;
        this.colors(pointer, "green");
        input.setRawMode(true);
        readline_1.default.emitKeypressEvents(input);
        let length = options.length;
        let colrss = chalk_1.default.red("" + pointer + "");
        for (let i = 0; i < length; i++) {
            let result = "";
            result += ` ${colrss} ${options[i]}\n`;
            output.write(result);
        }
        input.resume();
        process.stdin.on("keypress", function (__, key) {
            if (key.name == "down") {
                let index = 0;
                let length = options.length;
                index++;
                if (options > 0) {
                    hasFirst = false;
                }
                for (let i = 0; i < length; i++) {
                    let result = "";
                    let colrss = chalk_1.default.red("" + pointer + "");
                    result +=
                        i === index ? ` ${colrss} ${options[i]}\n` : ` ${options[i]}\n`;
                    output.write(result);
                }
            }
        });
    }
    colors(text, colors = "green") {
        const clr = {
            green: 32,
        };
        if (clr[colors])
            `\x1b[${clr[colors]}m${text}\x1b[0m`;
        //default for colors not included
        return `\x1b[32m${text}\x1b[0m`;
    }
}
const jsframe = new select();
jsframe.start();
