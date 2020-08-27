exports.seed = function (knex) {
  const types = [
    "Creative",
    "Energetic",
    "Tingly",
    "Euphoric",
    "Relaxed",
    "Aroused",
    "Happy",
    "Uplifted",
    "Hungry",
    "Talkative",
    "None",
    "Giggly",
    "Focused",
    "Sleepy",
    "Dry Mouth",
  ];

  const formattedTypes = types.map((type) => {
    return { type: type };
  });

  return knex("types").insert(formattedTypes);
};