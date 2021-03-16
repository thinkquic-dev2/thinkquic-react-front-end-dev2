export const getDateNowFormatted = () => {
  const currentDate = new Date(Date.now());
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  return month + "/" + day + "/" + year;
};
