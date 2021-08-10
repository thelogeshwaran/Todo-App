export function filterData(data, type) {
  switch (type) {
    case "All":
      return data;
    case "low":
    case "high":
    case "medium":
      const filteredData = data.filter((item) => item.priority === type);
      return filteredData;
    default:
      return data;
  }
}
