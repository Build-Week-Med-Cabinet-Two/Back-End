exports.seed = function (knex, Promise) {
  return knex("lists").insert([
    { user_id: 1, listName: "Sleepy", issues: "Dancer", flavor: "floral", effect: "easing", issues:"need to sleep", strain: ""},
    { user_id: 1, listName: "Grumpy", issues: "Prancer", flavor: "Dank", effect: "easing", issues:"need to sleep", strain: ""},
    { user_id: 1, listName: "Sneezy", issues: "Dotzen", flavor: "Peachy", effect: "easing", issues:"need to sleep", strain: "" },
    { user_id: 2, listName: "Dopey", issues: "Blitzen", flavor: "taste like smoke", effect: "easing", issues:"need to sleep", strain: ""},
    { user_id: 2, listName: "Doc", issues: "Curley", flavor: "lorem", effect: "easing", issues:"need to sleep", strain: ""},
    { user_id: 2, listName: "Rudoff", issues: "Moe", flavor: "ipsom", effect: "easing", issues:"red nose", strain: "Girl Scout Cookies"},
    { user_id: 2, listName: "Couchlock", issues: "Buster", flavor: "bananna", effect: "easing", issues:"need to watch tv", strain: ""}
  ]);
};