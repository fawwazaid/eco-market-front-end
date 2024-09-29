import React from "react";

interface FilterCategoryProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const FilterCategory: React.FC<FilterCategoryProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onSelectCategory(e.target.value)}
      className="px-4 py-2 border rounded-lg shadow-sm"
    >
      <option value="">All Categories</option>
      <option value="organic">Organic</option>
      <option value="ecofriendly">Ecofriendly</option>
    </select>
  );
};

export default FilterCategory;
