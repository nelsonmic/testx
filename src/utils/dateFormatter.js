export const formatDate = (date) => {
  const option = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const finalDate = new Date(date).toString("en-US", option);
  const final = finalDate.slice(0, 15);
  return final;
};
