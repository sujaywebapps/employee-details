import Datastore from "nedb";

var db = new Datastore({ filename: "../db/employeeData.db", autoload: true });

export const getEmployees = (req, res, next) => {
  db.find({}, function (err, docs) {
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
  console.log("inside add employee");
  db.insert(req?.body, function (err, newDoc) {
    res.status(200).json({
      body: "Employee Added Successfully",
      data: newDoc,
    });
  });
}
