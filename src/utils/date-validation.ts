export const validateDate = (date: string) => {
  const pickedDate = new Date(date);
  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);

  return pickedDate < todaysDate;
};
