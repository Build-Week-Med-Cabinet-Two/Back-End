const router = require("express").Router();
//add restricted middleware to functions
const restricted = require("../middleware/restricted.js");
const Users = require("./users-model.js");
const axios = require("axios");
const FormData = require("form-data");

const demo = [
  {
    Description:
      "Qush is a 70/30 indica-dominant cannabis strain from TGA Genetics, who combines Pre-98 Bubba Kush with Space Queen. Bred for potency as well as flavor, Qush’s resin-packed buds radiate with sweet aromas of grape, cherry, and hashy spice. This tranquilizing strain has a way of calming worries and upset stomachs, but keep in mind that Qush can have a sedating, cloudy effect on the mind so consider saving this one for evenings and lazy days.",
    Effects: "Relaxed,Sleepy,Uplifted,Happy,Euphoric",
    Flavor: "Flowery,Citrus,Pungent",
    Rating: 4.5,
    Strain: "Qush",
    Type: "indica",
  },
  {
    Description:
      "Another member of the “planetary series,” Venus OG is a hybrid strain bearing OG Kush heritage, although its specific parent strains are disputed. Each glistening trichome carries a resemblance to the bright planet this strain is named after, coating its conic buds in a galactic blanket of white crystals. A fresh pine aroma mixed with sour notes of lemon draws you in, and next comes the heavy euphoria to take away your sense of gravity and lift you to a happy, relaxed place.",
    Effects: "Focused,Tingly,Happy,Uplifted,Creative",
    Flavor: "Citrus,Lemon,Berry",
    Rating: 4.8,
    Strain: "Venus-Og",
    Type: "hybrid",
  },
  {
    Description:
      "King Kong, mothered by Ed Rosenthal Super Bud, is an indica-dominant hybrid with head-to-toe effects as strong as the giant ape himself. These dense conic buds come frosted in crystals and ribboned in hairs despite its short flowering time of only 7 to 8 weeks. King Kong is known to have a pungent sour, skunky smell with long-lasting effects that target pain, nausea, anxiety, and the appetite. Even though its genetics tip toward the indica side, King Kong has an uplifting and focused effect enjoyed by indica and sativa lovers alike.",
    Effects: "Happy,Focused,Giggly,Relaxed,Uplifted",
    Flavor: "Earthy,Flowery,Pungent",
    Rating: 4.2,
    Strain: "King-Kong",
    Type: "hybrid",
  },
];

async function getRecs(prefs) {
  try {
    const formData = new FormData();

    formData.append("Flavors/Effects", prefs);

    const recResponse = await axios.post(
      "https://medcabinet-ds.herokuapp.com/recommend",
      formData,
      {
        // You need to use `getHeaders()` in Node.js because Axios doesn't
        // automatically set the multipart form boundary in Node.
        headers: formData.getHeaders(),
      }
    );
    const recommendations = recResponse.data;

    return recommendations;
  } catch (err) {
    return err.message;
  }
}

async function getListObject(list_id) {
  try {
    const name = await Users.getList(list_id);
    const effects = await Users.getEffects(list_id);
    const flavors = await Users.getFlavors(list_id);
    // console.log(listID, name[0].listName, list_id)
    const list = {
      name: name[0].listName,
      //    id: name[0].id,
      description: name[0].userDescription,
      effects: effects.map((x) => x.effect),
      flavors: flavors.map((x) => x.flavor),
    };
    return list;
  } catch (err) {
    return err.message;
  }
}

router.post("/add-list", async (req, res) => {
  try {
    let user = req.decodedJwt.username;
    let listName = req.body.listName;
    let description = req.body.description;
    let id = req.decodedJwt.subject;
    let newPreferences = req.body;

    let exists = await Users.getListId(listName, id);
    if (exists.length > 0) {
      res.status(400).json({
        message: "A list with that name already exists.",
        error: "Try something new",
      });
    }

    await Users.addList(listName, id, description);
    //let payload = await getListObject(id);
    //console.log(payload)
    const ListId = await Users.getListId(listName, id);
    let newListId = ListId[0].id;

    let allFlavors = await Users.getEffectOrFlavorIds("flavor");
    let allEffects = await Users.getEffectOrFlavorIds("effect");

    let someFlavors = allFlavors.filter((flavor) => {
      return newPreferences.flavors.some(function (e) {
        return e == flavor.flavor;
      });
    });

    let someEffects = allEffects.filter((effect) => {
      return newPreferences.effects.some(function (e) {
        return e == effect.effect;
      });
    });
    let EffectArr = someEffects.map((x) => ({
      list_id: newListId,
      effect_id: x.id,
    }));
    let FlavorArr = someFlavors.map((x) => ({
      list_id: newListId,
      flavor_id: x.id,
    }));

    await Users.updatePrefs(FlavorArr, "flavor");
    await Users.updatePrefs(EffectArr, "effect");
    let payload = await getListObject(newListId);
    let searchValue = Object.values(payload).flat().join(" ");
    let recommendations = await getRecs(searchValue);
    res.status(200).json({
      message: ` ${user} just CREATED list: ${listName}`,
      list: payload,
      results: reccomendations,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      err: err,
      errmessage: err.message,
    });
  }
});
router.put("/update-list", async (req, res) => {
  try {
    let user = req.decodedJwt.username;
    let oldListName = req.body.oldListName;
    let listName = req.body.listName;
    let description = req.body.description;
    let id = req.decodedJwt.subject;
    let newPreferences = req.body;

    await Users.deleteList(oldListName, id);
    await Users.addList(listName, id, description);
    //let payload = await getListObject(id);
    //console.log(payload)
    const ListId = await Users.getListId(listName, id);
    let newListId = ListId[0].id;

    let allFlavors = await Users.getEffectOrFlavorIds("flavor");
    let allEffects = await Users.getEffectOrFlavorIds("effect");

    let someFlavors = allFlavors.filter((flavor) => {
      return newPreferences.flavors.some(function (e) {
        return e == flavor.flavor;
      });
    });

    let someEffects = allEffects.filter((effect) => {
      return newPreferences.effects.some(function (e) {
        return e == effect.effect;
      });
    });
    let EffectArr = someEffects.map((x) => ({
      list_id: newListId,
      effect_id: x.id,
    }));
    let FlavorArr = someFlavors.map((x) => ({
      list_id: newListId,
      flavor_id: x.id,
    }));

    await Users.updatePrefs(FlavorArr, "flavor");
    await Users.updatePrefs(EffectArr, "effect");
    let payload = await getListObject(newListId);
    let searchValue = Object.values(payload).flat().join(" ");
    //console.log(searchValue)
    let recommendations = await getRecs(searchValue);
    res.status(200).json({
      message: ` ${user} just UPDATED list: ${listName}`,
      list: payload,
      results: recommendations,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      err: err,
      errmessage: err.message,
    });
  }
});

router.get("/list/:listName", restricted, async (req, res) => {
  const list = req.params.listName;
  const id = await Users.getListId(list, req.decodedJwt.subject);
  const payload = await getListObject(id[0].id);
  let searchValue = Object.values(payload).flat().join(" ");
  getRecs(searchValue)
    .then((results) => {
      res.status(200).json({ results: results });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get("/lists/", restricted, (req, res) => {
  Users.getLists(req.decodedJwt.subject)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get("/", restricted, (req, res) => {
  Users.getUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get("/:id", restricted, (req, res) => {
  Users.getUsers(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.delete("/delete-list", async (req, res) => {
  try {
    let listName = req.body.listName;
    let id = req.decodedJwt.subject;
    console.log(listName, id);
    let exists = await Users.getListId(listName, id);
    if (exists.length < 1) {
      res.status(400).json({
        message: "That list doesn't exist",
        error: "That's a bummer for ya",
      });
    }
    await Users.deleteList(listName, id);

    res.status(200).json({
      message: `List successfully deleted`,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "list delete failed",
        err: err,
        errmessage: err.message,
      });
  }
});

router.delete("/:id", restricted, async (req, res, next) => {
  try {
    await Users.remove(req.params.id);
    res
      .status(200)
      .json({ message: `${req.params.id} DELETED`, Users: req.Users });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
