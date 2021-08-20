export const getEmployees = (req, res, next) => {
  res.status(200).json({
    body: "Employee List Data",
  });
};

export const addEmployee = (req, res, next) => {
  res.status(200).json({
    body: "Add Employee",
  });
};
