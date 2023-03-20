export const tadarusInput = (req, res, next) => {
  try {
    if (!req.body) throw new Error("raw input required!");
    const { juz, surah, ayat, date, time } = req.body;

    if (!juz) throw new Error("Juz required!");
    if (!surah) throw new Error("Surah required!");
    if (!ayat) throw new Error("Ayat required!");
    if (!date) throw new Error("date required!");
    if (!time) throw new Error("Time required!");

    req.data = { juz, surah, ayat, date, time };
    next();
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
