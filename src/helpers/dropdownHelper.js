export const convertJsonToDropDownFormat = (ragas) => {
  return ragas.map((raga) => {
    return {
      key: raga.title,
      value: raga.title,
      text: raga.title,
    };
  });
};
