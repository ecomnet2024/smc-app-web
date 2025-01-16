import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const data = [
  { id: 1, name: 'Alice', age: 24, city: 'Paris' },
  { id: 2, name: 'Bob', age: 30, city: 'New York' },
  { id: 3, name: 'Charlie', age: 25, city: 'London' },
  { id: 4, name: 'David', age: 28, city: 'Berlin' },
  // Ajoute plus de données ici
];

const FilterableTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Réinitialiser la pagination lorsque la recherche change
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0); // Réinitialiser la pagination lorsque le filtre change
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Filtrer les données
  const filteredData = data.filter((row) => {
    const matchesSearch = row.name.toLowerCase().includes(searchTerm.toLowerCase()) || row.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || row.city === filter;
    return matchesSearch && matchesFilter;
  });

  // Gérer la pagination
  const displayedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      {/* Champ de recherche */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        margin="normal"
      />

      {/* Filtre */}
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel>Filter by City</InputLabel>
        <Select
          value={filter}
          onChange={handleFilterChange}
          label="Filter by City"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Paris">Paris</MenuItem>
          <MenuItem value="New York">New York</MenuItem>
          <MenuItem value="London">London</MenuItem>
          <MenuItem value="Berlin">Berlin</MenuItem>
        </Select>
      </FormControl>

      {/* Tableau */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default FilterableTable;
