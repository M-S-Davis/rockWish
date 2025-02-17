const Gear = require("../models/Gear"); // Requires the model schema

module.exports = {
  getGear: async (req, res) => {
    try {
      res.render("gear.ejs");
    } catch (err) {
      console.error(err);
    }
  },
  showGear: async (req, res) => {
    try {
      const gearItems = await Gear.find({ userId: req.user.id });
      res.render("itWorks.ejs", { gears: gearItems, user: req.user });
    } catch (err) {
      console.error(err);
    }
  },
  createGear: async (req, res) => {
    {
      try {
        await Gear.create({
          gearName: req.body.gearName,
          gearBrand: req.body.gearBrand,
          gearPrice: req.body.gearPrice,
          gearCondition: req.body.gearCondition,
          gearNote: req.body.gearNote,
          gearImage: req.body.gearImage,
          visibility: req.body.visibility.toLowerCase(),
          userId: req.user.id,
        });

        console.log(
          `${req.body.gearName} ${req.body.gearBrand} has been added!`
        );
        res.redirect("/dashboard");
      } catch (err) {
        console.log(err);
      }
    }
  },
  deleteGear: async (req, res) => {
    try {
      await Gear.findOneAndDelete({ _id: req.body.gearIdFromJSFile });
      console.log("Deleted Gear");
      res.json("Deleted It");
    } catch (err) {
      console.log(err);
    }
  },
};
