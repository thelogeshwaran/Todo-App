export function sortData(data, type) {
  switch (type) {
    case "A to Z":
      const sortedFromA = data.sort((a, b) => {
        if (a.todo?.toLowerCase() < b.todo?.toLowerCase()) return -1;
        if (a.todo?.toLowerCase() > b.todo?.toLowerCase()) return 1;
        return 0;
      });
      return sortedFromA;
    case "Z to A":
      const sortedFromZ = data.sort((a, b) => {
        if (a.todo?.toLowerCase() < b.todo.toLowerCase()) return 1;
        if (a.todo?.toLowerCase() > b.todo.toLowerCase()) return -1;
        return 0;
      });
      return sortedFromZ;
    case "High to Low":
      const sortedLtoH = data.sort((a, b) => {
        if (a.priority === b.priority) return 0;
        if (
          a.priority === "high" ||
          (a.priority === "medium" && b.priority === "low")
        ) {
          return -1;
        } else if (
          b.priority === "high" ||
          (b.priority === "medium" && a.priority === "low")
        ) {
          return 1;
        }
        return 0;
      });
      return sortedLtoH;
    case "Low to High":
      const sortedHtoL = data.sort((a, b) => {
        if (a.priority === b.priority) return 0;
        if (
          a.priority === "high" ||
          (a.priority === "medium" && b.priority === "low")
        ) {
          return 1;
        } else if (
          b.priority === "high" ||
          (b.priority === "medium" && a.priority === "low")
        ) {
          return -1;
        }
        return 0;
      });
      return sortedHtoL;
    default:
      return data;
  }
}
