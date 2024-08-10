

// bun note.ts "something"
// bun note.ts show

// git notes append --separator="\n---\n ### ${timestamp nicely formatted}"

// commit each day
// check if there is a commit for today or not
// if not, create a commit

// parse params
let params = Bun.argv.slice(2);
console.log({params});
if (params.includes("show")) {
    Bun.spawn(["git", "notes", "show"]);
    process.exit(0);
}

console.log('here???')

let message = params.join(" ");

let formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
}).format;

let day = formatter(new Date());
// check if current commit message matches the current date
let res = Bun.spawnSync(["git", "log", "-1", "--pretty=%B"]);
let commitMessage = res.stdout.toString();

console.log(commitMessage)

// await Bun.spawn(["git", "notes", "append", "--separator", "\n---\n ### ${timestamp nicely formatted}"]);