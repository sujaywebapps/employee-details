export const initialState = {
  name: "",
  group: "",
  city: "",
  salary: "",
  manager: "",
};

export const reducer = function (state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "group":
      return { ...state, group: action.payload };
    case "city":
      return { ...state, city: action.payload };
    case "salary":
      return { ...state, salary: action.payload };
    case "manager":
      return { ...state, manager: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error();
  }
};
