export const firestoreExtract = array => {
  if (array) {
    const arr = [];
    for (const key in array.docs) {
      arr.push({
        ...array.docs[key].data(),
        id: array.docs[key].id
      });
    }
    return arr;
  }
};
