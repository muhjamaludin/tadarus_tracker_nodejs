import { Sequelize } from "sequelize";
import Tadarus from "../models/TadarusModel.js";
import { getAllJuz, getSurahByJuz } from "../middlewares/Filter.js";

export const getTadarusAll = async (req, res) => {
  try {
    const resp = await Tadarus.findAll({
      order: [["id", "DESC"]],
    });
    res.status(200).send(resp);
  } catch (error) {
    console.error(error.message);
  }
};

export const getTadarusById = async (req, res) => {
  try {
    const resp = await Tadarus.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!resp) throw new Error("Tadarus record not found");
    res.status(200).send(resp);
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ message: error.message });
  }
};

export const createTadarus = async (req, res) => {
  try {
    await Tadarus.create(req.body);
    res.status(201).json({ message: "Tadarus record created!" });
  } catch (error) {
    console.error(error.message);
    res.status(400).send({
      message: error.message,
    });
  }
};

export const updateTadarus = async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await Tadarus.findOne({
      where: { id },
    });
    if (!resp) throw new Error("Tadarus record not found");

    await Tadarus.update(req.body, {
      where: { id },
    });
    res.status(200).send({ message: "Tadarus record updated!" });
  } catch (error) {
    console.error(error.message);
    res.status(400).send({
      message: error.message,
    });
  }
};

export const chartStatistics = async (req, res) => {
  let result = {};
  let ideals = [];
  let reals = [];

  let juzzes = await Tadarus.findAll({
    attributes: [[Sequelize.fn("max", Sequelize.col("juz")), "juz"], "date"],
    group: ["date"],
    raw: true,
  });

  const targetDate = new Date("2023-03-22");
  const startDate = new Date("2023-02-22");

  // counting ideal juz achieve
  const oneDay = 24 * 60 * 60 * 1000;
  const totalDiffDays = Math.round(Math.abs((startDate - targetDate) / oneDay));
  for (let i = 1; i <= totalDiffDays; i++) {
    ideals.push(Math.round((i / totalDiffDays) * 30));
  }

  // script get dates between two date
  const dates = [];
  let currentDate = startDate;
  const addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  while (currentDate <= targetDate) {
    dates.push(currentDate.toISOString().slice(0, 10));
    currentDate = addDays.call(currentDate, 1);
  }

  // counting statistic for real juz achieve
  let i = 0;
  let tempDate = juzzes[0].date;
  let tempJuz = juzzes[0].juz;
  for (let day of dates) {
    for (let juz of juzzes) {
      if (juz.date == day) {
        tempDate = juz.date;
        tempJuz = juz.juz;
      }
    }
    if (new Date(day) < new Date()) {
      reals.push(tempJuz);
    }
  }

  result = {
    dates,
    ideals,
    reals,
  };

  res.status(200).send(result);
};

export const getAllJuzQuran = (req, res) => {
  try {
    res.status(200).send(getAllJuz());
  } catch (error) {
    console.error(error);
  }
};

export const getSurahByJuzQuran = (req, res) => {
  try {
    const idJuz = req.params.id;
    res.status(200).send(getSurahByJuz(idJuz));
  } catch (error) {
    console.error(error);
  }
};
