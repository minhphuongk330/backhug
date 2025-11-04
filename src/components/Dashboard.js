import React, { useState } from 'react';
import UsersTable from './UsersTable'; 

function Dashboard() {
    const [activeMenuItem, setActiveMenuItem] = useState('Users management');
    const menuItems = [
        { key: 'dashboards', label: 'Dashboards & Statistics' },
        { key: 'partners', label: 'Distribution partners' },
        { key: 'companies', label: 'Companies' },
        { key: 'bookings', label: 'Bookings' },
        { key: 'devices', label: 'Devices' },
        { key: 'users', label: 'Users' },
        { key: 'users-management', label: 'Users management' },
        { key: 'consultations', label: 'Consultations' },
        { key: 'configuration', label: 'Configuration' },
        { key: 'support', label: 'Onboarding, tutorials & support' },
    ];
    const Sidebar = () => (
        <div style={{ 
            width: '250px', 
            backgroundColor: '#ffffff',
            borderRight: '1px solid #e5e7eb', 
            padding: '20px 0',
            minHeight: '100vh',
            boxSizing: 'border-box'
        }}>
            <div style={{ padding: '0 20px 30px', fontWeight: 'bold', fontSize: '1.5em' }}>
                BACKHUG
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {menuItems.map((item) => {
                    const isActive = activeMenuItem === item.key;
                    const itemStyle = {
                        padding: '10px 20px',
                        cursor: 'pointer',
                        color: isActive ? '#1e40af' : '#6b7280', 
                        backgroundColor: isActive ? '#e0f2fe' : 'transparent', 
                        fontWeight: isActive ? '600' : 'normal',
                        borderLeft: isActive ? '4px solid #3b82f6' : '4px solid transparent', 
                    };
                    return (
                        <li 
                            key={item.key}
                            style={itemStyle}
                            onClick={() => setActiveMenuItem(item.key)} 
                        >
                            {item.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <Sidebar />
            
            <div style={{ flexGrow: 1, padding: '20px 40px' }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    alignItems: 'center', 
                    paddingBottom: '20px',
                    borderBottom: '1px solid #e5e7eb'
                }}>
                    <span style={{ marginRight: '10px' }}>phuong</span>
                </div>
                <div style={{ marginTop: '20px' }}>
                    {activeMenuItem === 'users-management' ? (
                        <UsersTable />
                    ) : (
                        <h2 style={{ color: '#aaa' }}>day la: {activeMenuItem}</h2>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;