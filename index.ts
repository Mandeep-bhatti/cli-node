#! /usr/bin/env node
import path from "path";
import readline from "readline";
const input = process.stdin;
const output = process.stdout;

class select {
  indx: number = 0;
  lenth?: number = 0;
  options: any;
  question: string;
  color?: string;
  pointer: string;
  answer: any;
  first: Boolean = true;
  constructor(
    opt = {
      options: ["names", "dates", "green", "red"],
      question: "what is your name",
      color: "blue",
      type: "",
      pointer: "*",
      answer: [],
    }
  ) {
    let { options, question, color, type, pointer, answer } = opt;
    this.options = options;
    this.question = question;
    this.answer = answer;
    this.color = color;
    this.pointer = pointer;
  }

  start() {
    let options = this.options;
    let hasFirst: Boolean = this.first;
    let pointer = this.pointer;
    let clrs = this.colors(pointer, "green");

    input.setRawMode(true);
    readline.emitKeypressEvents(input);
    let length: number = options.length;
    let index: number = 0;

    let indexx = 0;
    output.write(this.question + "\n");
    for (let i = 0; i < length; i++) {
      let result: string = "";
      result += i === indexx ? ` ${clrs} ${options[i]}\n` : ` ${options[i]}\n`;
      output.write(result);
    }
    indexx++;
    input.resume();

    process.stdin.on("keypress", function (__: any, key: any) {
      if (key.name === "down") {
        let length: number = options.length;
        if (options > 0) {
          hasFirst = false;
        }
        readline.moveCursor(process.stdout, 0, -length);
        readline.clearLine(process.stdout, 1);
        index++;
        for (let i = 0; i < length; i++) {
          let result: string = "";
          result +=
            i == index ? ` ${clrs} ${options[i]}\n` : ` ${options[i]}\n`;
          output.write(result);
        }
      }
      if (key.name === "up") {
        let length: number = options.length;
        if (options > 0) {
          hasFirst = false;
        }
        readline.moveCursor(process.stdout, 0, -length);
        readline.clearLine(process.stdout, 1);
        index--;
        for (let i = 0; i < length; i++) {
          let result: string = "";
          result +=
            i == index ? ` ${clrs} ${options[i]}\n` : ` ${options[i]}\n`;
          output.write(result);
        }
      }
    });
  }
  colors(text: any, colors: any = "green") {
    const clr: any = {
      green: 32,
    };
    if (clr[colors]) `\x1b[${clr[colors]}m${text}\x1b[0m`;
    return `\x1b[32m${text}\x1b[0m`;
  }
}

const jsframe = new select();
jsframe.start();
