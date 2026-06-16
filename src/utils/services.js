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

export const getInitials = (name = "") => {
  if (!name.trim()) return "";

  const parts = name.trim().split(/\s+/);

  // Single name → V
  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  // First + Last → VS
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
