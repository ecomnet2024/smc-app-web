import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
} from '@mui/material';

const initialData = [
  { id: 1, name: 'Alice', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Charlie', role: 'Moderator', status: 'Active' },
  { id: 4, name: 'Diana', role: 'User', status: 'Active' },
  { id: 5, name: 'Edward', role: 'Admin', status: 'Inactive' },
];

export default function DataTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRoleFilterChange = (event) => {
    setFilterRole(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredData = initialData.filter((item) => {
    return (
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
      (item.role === filterRole || filterRole === '') &&
      (item.status === filterStatus || filterStatus === '')
    );
  });

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FormControl size="small" variant="outlined">
          <InputLabel>Role</InputLabel>
          <Select
            value={filterRole}
            onChange={handleRoleFilterChange}
            label="Role"
          >
            <MenuItem value="">All Roles</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Moderator">Moderator</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" variant="outlined">
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={handleStatusFilterChange}
            label="Status"
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
