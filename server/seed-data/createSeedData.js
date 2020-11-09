const jsonfile = require("jsonfile");
const uuid = require("uuid/v4");
const moment = require("moment");

const data = [
  {
    id: uuid(),
    createdAt: moment().subtract(4, "days"),
    title: "First to-do",
    description: "Todo description.",
    done: true
  },
  {
    id: uuid(),
    createdAt: moment().subtract(2, "days"),
    title: "Second to-do",
    description: "Todo description.",
    done: false
  }
];

jsonfile.writeFileSync("todos.json", data, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log("data created successfully");
  }
});
