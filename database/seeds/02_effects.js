exports.seed = function (knex) {
  const effects = [
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

  const formattedEffects = effects.map((effect) => {
    return { effect: effect };
  });

  return knex("effects").insert(formattedEffects);
};