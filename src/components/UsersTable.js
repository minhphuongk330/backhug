import React, { useState, useMemo } from 'react';
const userData = [
  { id: 1, no: '01.', email: 'vickea@aol.com', name: 'Victoria Corderi-keaneKeane', userType: '', roles: 'Admin', age: 125, gender: 'Male' },
  { id: 2, no: '02.', email: 'sillyvegansausage@mail.com', name: 'Silly Vegan Sausage', userType: '', roles: 'User', age: 35, gender: 'Male' },
  { id: 3, no: '03.', email: 'newyu05@mailinator.com', name: 'New Ufive', userType: '', roles: 'User', age: 35, gender: 'Female' },
  { id: 4, no: '04.', email: 'rebeccabutler204@gmail.com', name: 'Rebecca Butler', userType: 'Free-to-use member at Pacla office Edinburgh', roles: 'User', age: 125, gender: 'Male' },
  { id: 5, no: '05.', email: 'nguyenthuhoa712@gmail.com', name: 'Hoa Nguyen', userType: 'App-paying member at Ho Guom Plaza', roles: 'Company admin', age: 33, gender: 'Female' },
  { id: 6, no: '06.', email: 'newyu03@mailinator.com', name: 'New UThree', userType: 'App-paying member at Ponyo', roles: 'Location admin', age: 35, gender: 'Male' },
];

const ROWS_PER_PAGE = 6; 

function UsersTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState('');
  const filteredData = useMemo(() => {
    let result = userData;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    if (searchTerm) {
      result = result.filter(user =>
        user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }   
    if (roleFilter) {
        result = result.filter(user => user.roles.includes(roleFilter));
    }    
    return result;
  }, [searchTerm, roleFilter]);
  const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, startIndex + ROWS_PER_PAGE);
  if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
  } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleRoleChange = (e) => {
    setRoleFilter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Users Management </h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search by email/name..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: '5px', border: '1px solid #ccc' }}
        />
        <select value={roleFilter} onChange={handleRoleChange} style={{ padding: '5px', border: '1px solid #ccc' }}>
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Company admin">Company admin</option>
            <option value="Location admin">Location admin</option>
        </select>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            {['No', 'Email', 'Name', 'User type', 'Roles', 'Age', 'Gender', 'Actions'].map(header => (
              <th key={header} style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.no}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.userType}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.roles}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.age}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.gender}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <button onClick={() => console.log('Deleting:', user.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                    
                  </button>
                </td>
              </tr>
            ))
          ) : (
             <tr><td colSpan="8" style={{ textAlign: 'center', padding: '10px' }}>No users found.</td></tr>
          )}
        </tbody>
      </table>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>
          Showing {currentData.length} of {filteredData.length} users.
        </span>
        <div>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{ padding: '5px 10px', marginRight: '10px' }}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            style={{ padding: '5px 10px', marginLeft: '10px' }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default UsersTable;