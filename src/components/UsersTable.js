import React, { useState, useMemo } from 'react';

function UsersTable({ users, ROWS_PER_PAGE }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [roleFilter, setRoleFilter] = useState('');
    const filteredData = useMemo(() => {
        let result = users; 
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
    }, [searchTerm, roleFilter, users]);

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
                        currentData.map((user, index) => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    {(startIndex + index + 1).toString().padStart(2, '0') + '.'}
                                </td>
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