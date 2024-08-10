// bun note.ts "something"
// bun note.ts show

import { readableStreamToText } from "bun";

// git notes append --separator="\n---\n ### ${timestamp nicely formatted}"

// commit each day
// check if there is a commit for today or not
// if not, create a commit

// parse params
let params = Bun.argv.slice(2);

if (params.includes("show")) {
    let {stdout} = Bun.spawn(["git", "notes", "show"],);
    let text = await readableStreamToText(stdout);
    console.log(text);
    process.exit(0);
}

let message = params.join(" ");

let dayFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
}).format;

let timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
}).format;

let day = dayFormatter(new Date());
// check if current commit message matches the current date
let res = Bun.spawnSync(["git", "log", "-1", "--pretty=%B"]);
let commitMessage = res.stdout.toString();

if (!commitMessage || !commitMessage.includes(day)) {
    Bun.spawn(["git", "commit", "--allow-empty", "-m", day]);
    Bun.spawn(["git", "notes", 'add', `\# ${day}`])
}

Bun.spawn([
    "git",
    "notes",
    "append",
    `--separator=\n\n---\n\n \#\#\# ${timeFormatter(new Date())}`,
    "-m",
    JSON.stringify(message),
]);