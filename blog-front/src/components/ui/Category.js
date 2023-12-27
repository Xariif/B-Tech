const CategoryColors = {
  CARS: "blue",
  TECH: "orange",
  BUSINESS: "black",
  FINANCE: "green",
  HEALTH: "red",
  FITNESS: "purple",
  FILESTYLE: "yellow",
  TRAVEL: "pink",
  FOOD: "brown",
  FASHION: "gray",
  ENTERTEINMENT: "cyan",
  EDUCATION: "magenta",
  NATURE: "teal",
  SPORT: "lime",
  OTHER: "indigo",
};

export default function Category({ category }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: ".5rem",
      }}
    >
      <div
        style={{
          height: ".3rem",
          width: "1.5rem ",
          marginRight: ".5rem",
          backgroundColor: CategoryColors[category],
        }}
      />

      <div style={{ marginRight: "1rem", textTransform: "uppercase" }}>
        {category}
      </div>
    </div>
  );
}
