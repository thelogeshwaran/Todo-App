export function filterData(data, type) {
  switch (type) {
    case "All":
      return data;
    default:
      const filteredData = data.filter((item) => item.priority === type);
      return filteredData;
  }
}
