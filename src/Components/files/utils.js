import { db } from "../../Files/firebase";

export const collectionName = (para) => {
  if (para === "individual_user") {
    return "individual_users";
  } else if (para === "company_user") {
    return "company_users";
  }
};

export const setToDoc = async (col, doc, data) => {
  await db
    .collection(col)
    .doc(doc)
    .set(data, { merge: true })
    .then(() => {});
};

export const getFromDoc = async (col, doc, sortResult, set) => {
  await db
    .collection(col)
    .doc(doc)
    .get()
    .then((doc) => {
      if (doc.exists) {
        if (!sortResult) {
          set(doc.data());
        } else {
          set(sortById(doc.data()?.departments));
        }
      }
    });
};

export const sortById = (data) => {
  const inputData = [...data];
  return inputData.sort((a, b) => (a.id > b.id ? 1 : -1));
};
