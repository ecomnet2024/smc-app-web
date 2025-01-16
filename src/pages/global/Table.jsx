import React, { useState } from 'react';

const DropdownWithSearch = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Filtrer les éléments en fonction du terme de recherche
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div style={{ width: 'auto' }}>
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            width: '100%',
            maxHeight: '150px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: 'white',
            zIndex: 1000,
          }}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSearchTerm(item);
                  setIsOpen(false);
                }}
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                }}
              >
                {item}
              </div>
            ))
          ) : (
            <div style={{ padding: '8px', color: '#888' }}>Aucun résultat</div>
          )}
        </div>
      )}
    </div>

  );

};

export default DropdownWithSearch;
