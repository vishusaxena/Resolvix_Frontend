export const formatDate = (date) => {
  if (!date) return "-";

  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = d
    .toLocaleString("en-US", {
      month: "short",
    })
    .toUpperCase();
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};
