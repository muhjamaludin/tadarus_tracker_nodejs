import Tadarus from "../models/TadarusModel.js";

export const getTadarusAll = async (req, res) => {
  try {
    const resp = await Tadarus.findAll();
    res.status(200).send(resp);
  } catch (error) {
    console.error(error.message);
  }
};

export const getTadarusById = async (req, res) => {
  try {
    const resp = await Tadarus.findOne({
      where: {
        id: req.params.id
      }
    })
    if (!resp) throw new Error("Tadarus record not found")
    res.status(200).send(resp)
  } catch (error) {
    console.error(error.message)
    res.status(400).send({message: error.message})
  }
}

export const createTadarus = async (req, res) => {
  try {
    await Tadarus.create(req.body);
    res.status(201).json({ message: "Tadarus record created!" });
  } catch(error) {
    console.error(error.message);
    res.status(400).send({
      message: error.message
    })
  }
};

export const updateTadarus = async (req, res) => {
  try {
    const id = req.params.id
    const resp = await Tadarus.findOne({
      where: {id}
    })
    if (!resp) throw new Error("Tadarus record not found")

    await Tadarus.update(req.body, {
      where: {id}
    })    
    res.status(200).send({message: "Tadarus record updated!"})
  } catch (error) {
    console.error(error.message)
    res.status(400).send({
      message: error.message
    })
  }
}