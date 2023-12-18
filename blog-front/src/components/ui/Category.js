const CategoryColors = {
  TECH: 'blue',
  SPACE: 'orange',
  MOTO: 'black',
  NATURE: 'green',
  IMPORTANT: 'red',
  TIPS: 'purple',
};

export default function Category({ category }) {
  return (
    <div
      style={{
			  display: 'flex',
			  alignItems: 'center',
			  fontSize: '.5rem',
      }}
    >
      <div
        style={{
				  height: '.3rem',
				  width: '1.5rem ',
				  marginRight: '.5rem',
				  backgroundColor: CategoryColors[category],
        }}
      />

      <div style={{ marginRight: '1rem', textTransform: 'uppercase' }}>
        {category}
      </div>
    </div>
  );
}
