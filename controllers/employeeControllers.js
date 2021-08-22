import Datastore from "nedb";

var db = new Datastore({ filename: "../db/employeeData.db", autoload: true });

export const getEmployees = (req, res, next) => {
  let queryObj = {};
  console.log("url", req.query);
  const { startDate, endDate } = req.query;
  if (startDate && endDate) {
    queryObj = {
      ...queryObj,
      ...{ createdAt: { $gte: startDate, $lte: endDate } },
    };
  }
  db.find(queryObj, function (err, docs) {
    docs.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    res.status(200).json({
      body: "Employee List Data",
      data: docs,
    });
  });
};

export const getEmployeesGroup = (req, res, next) => {
  db.find({}, function (err, docs) {
    var result = docs.reduce(function (r, a) {
      r[a.group] = r[a.group] || [];
      r[a.group].push(a);
      return r;
    }, Object.create(null));
    res.status(200).json({
      body: "Employee List Data",
      data: result,
    });
  });
};

export async function addEmployee(req, res, next) {
  // db.remove({}, { multi: true }, function (err, numRemoved) {});
  db.insert(req?.body, function (err, newDoc) {
    res.status(200).json({
      body: "Employee Added Successfully",
      data: newDoc,
    });
  });
}

export async function clearAll(req, res, next) {
  db.remove({}, { multi: true }, function (err, numRemoved) {
    res.status(200).json({
      body: "Employee Details Removed",
      data: numRemoved,
    });
  });
}
