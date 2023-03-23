import fs from "fs";

const locFile = new URL("../data/quranLists.json", import.meta.url);

const listSurahByJuz = JSON.parse(fs.readFileSync(locFile), "utf-8");

export const getAllJuz = () => {
  const lists = listSurahByJuz.map((j) => j.juz);
  const uniqList = [...new Set(lists)];
  return uniqList;
};

export const getSurahByJuz = (juz = 1) => {
  const lists = listSurahByJuz.filter((j) => j.juz == juz);
  return lists;
};
