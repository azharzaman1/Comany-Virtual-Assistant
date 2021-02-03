export const collectionName = (para) => {
  if (para === "individual__user") {
    return "individual_users";
  } else if (para === "company__user") {
    return "company_users";
  }
};
