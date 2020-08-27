exports.seed = function (knex) {
  const types = [
    "Indica",
    "Sativa",
    "Hybrid"
  ];

  const formattedTypes = types.map((type) => {
    return { type: type };
  });

  return knex("types").insert(formattedTypes);
};