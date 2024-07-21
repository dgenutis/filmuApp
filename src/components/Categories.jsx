import './Categories.css'
const Categories = ({ categories, onSelectedCategory }) => {
  return (
    <>
    <div className="container1">
      <h2> Movies by Categories</h2>
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
    </>
  );
};

export default Categories;
