import React, { useState } from 'react';
import './SearchBar.css'

const SearchBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="search-bar" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <input type="text" placeholder="Search..." />
      {isDropdownOpen && (
        <div className="dropdown">
          {/* Dropdown content goes here */}
          <ul>
            <li>Search Result 1</li>
            <li>Search Result 2</li>
            {/* Add more search results here */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

