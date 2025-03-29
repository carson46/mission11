import { useEffect, useState } from 'react';
import './CategoryFilter.css';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/api/Book/GetProjectTypes'
        );
        const data = await response.json();
        console.log('Categories:', data);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  function HandleCheckBoxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((category) => category !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  }

  return (
    <>
      <div className="category-filter">
        <h2>Categories</h2>
        <ul className="category-list">
          {categories.map((category) => (
            <div key={category} className="category-item">
              <input
                type="checkbox"
                id={category}
                name={category}
                value={category}
                className="category-checkbox"
                onChange={HandleCheckBoxChange}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default CategoryFilter;
