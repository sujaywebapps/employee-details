import moment from "moment";

export const groupByDate = (arrObj) => {
  const groupedResult = arrObj.reduce(function (r, a) {
    const createdAt = moment(new Date(a.createdAt)).format("DD/MM/YYYY");
    r[createdAt] = r[createdAt] || 0;
    r[createdAt] = r[createdAt] + 1;
    return r;
  }, Object.create(null));
  return groupedResult;
};
