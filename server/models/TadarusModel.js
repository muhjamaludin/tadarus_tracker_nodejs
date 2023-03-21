import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Tadarus = db.define(
  "tadaruses",
  {
    juz: DataTypes.SMALLINT,
    surah: DataTypes.STRING(20),
    ayat: DataTypes.SMALLINT,
    date: DataTypes.DATEONLY,
    time: DataTypes.STRING(7),
  },
  {
    freezeTableName: true,
  }
);

export default Tadarus;

(async () => {
  await db.sync();
})();
