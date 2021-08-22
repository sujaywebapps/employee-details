import { groupList, managersList } from "./const";

export const getGroup = (g) => {
  let indexVal = groupList.findIndex((grp) => grp.value === g);
  return indexVal >= 0 ? groupList[indexVal].label : "";
};

export const getManagerp = (m) => {
  let indexVal = managersList.findIndex((manager) => manager.value === m);
  return indexVal >= 0 ? managersList[indexVal].label : "";
};

export const sortArr = (arr, sortKey, sortType = 1) => {
  if (sortType === 1) {
    return arr.sort(
      (a, b) => new Date(a[sortKey]).getTime() - new Date(b[sortKey]).getTime()
    );
  } else {
    return arr.sort(
      (a, b) => new Date(b[sortKey]).getTime() - new Date(a[sortKey]).getTime()
    );
  }
};

export const getMax = (arr, key) => {
  return Math.max.apply(
    Math,
    arr.map(function (o) {
      return o[key];
    })
  );
};
