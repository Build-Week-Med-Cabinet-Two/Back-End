exports.seed = function (knex) {
  const intakes = [
    "Vape",
    "Edible",
    "Smoke",
    "Topical"
  ];

  const formattedIntakes = intakes.map((intake) => {
    return { intake: intake };
  });

  return knex("intakes").insert(formattedIntakes);
};