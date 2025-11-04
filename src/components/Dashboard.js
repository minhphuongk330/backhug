import React, { useState } from 'react';
import UsersTable from './UsersTable'; 
const initialUserData = [
    { id: 1, no: '01.', email: 'vickea@aol.com', name: 'Victoria Corderi-keaneKeane', userType: '', roles: 'Admin', age: 125, gender: 'Male' },
    { id: 2, no: '02.', email: 'sillyvegansausage@mail.com', name: 'Silly Vegan Sausage', userType: '', roles: 'User', age: 35, gender: 'Male' },
    { id: 3, no: '03.', email: 'newyu05@mailinator.com', name: 'New Ufive', userType: '', roles: 'User', age: 35, gender: 'Female' },
    { id: 4, no: '04.', email: 'rebeccabutler204@gmail.com', name: 'Rebecca Butler', userType: 'Free-to-use member at Pacla office Edinburgh', roles: 'User', age: 125, gender: 'Male' },
    { id: 5, no: '05.', email: 'nguyenthuhoa712@gmail.com', name: 'Hoa Nguyen', userType: 'App-paying member at Ho Guom Plaza', roles: 'Company admin', age: 33, gender: 'Female' },
    { id: 6, no: '06.', email: 'newyu03@mailinator.com', name: 'New UThree', userType: 'App-paying member at Ponyo', roles: 'Location admin', age: 35, gender: 'Male' },
];
const availableRoles = ['Pacla super admin', 'Customer service', 'Makerting', 'Production tester', 'Trial'];
const ROWS_PER_PAGE = 6;
const AddUserForm = ({ onClose, onAddUser }) => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(''); 

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email || !role) {
            alert("Email và Role là bắt buộc.");
            return;
        }

        const newUser = {
            id: Date.now(),
            email,
            name: email.split('@')[0], 
            userType: 'Invited (' + role + ')', 
            roles: role,
            age: 'N/A',
            gender: 'N/A'
        };

        onAddUser(newUser); 
        onClose();
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', width: '450px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.5em' }}>Invite users</h3>
                    <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '1.5em', cursor: 'pointer', color: '#666' }}>&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Email <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Role <span style={{ color: 'red' }}>*</span></label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', appearance: 'none', backgroundColor: 'white' }}
                        >
                            <option value="" disabled>Please select role</option>
                            {availableRoles.map(r => (<option key={r} value={r}>{r}</option>))}
                        </select>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                        <button type="button" onClick={onClose} style={{ padding: '10px 15px', border: '1px solid #ccc', backgroundColor: 'white', color: '#333', borderRadius: '4px' }}>
                            Cancel
                        </button>
                        <button type="submit" style={{ padding: '10px 15px', border: 'none', backgroundColor: '#3b82f6', color: 'white', borderRadius: '4px' }}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
function Dashboard() {
    const [activeMenuItem, setActiveMenuItem] = useState('users-management');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [users, setUsers] = useState(initialUserData); 
    const handleAddUser = (newUser) => {
        setUsers(prevUsers => [
            ...prevUsers,
            newUser
        ]);
    };

    const menuItems = [
        { key: 'dashboards', label: 'Dashboards & Statistics' },
        { key: 'partners', label: 'Distribution partners' },
        { key: 'companies', label: 'Companies' },
        { key: 'bookings', label: 'Booking' },
        { key: 'devices', label: 'Devices' },
        { key: 'users', label: 'Users' },
        { key: 'users-management', label: 'Users management' },
        { key: 'consultations', label: 'Consultations' },
        { key: 'configuration', label: 'Configuration' },
        { key: 'support', label: 'Onboarding, tutorials & support' },
        
    ];
    const Sidebar = () => (
        <div style={{ width: '250px', backgroundColor: '#ffffff', borderRight: '1px solid #e5e7eb', padding: '20px 0', minHeight: '100vh', boxSizing: 'border-box' }}>
            <div style={{ padding: '0 20px 30px', fontWeight: 'bold', fontSize: '1.5em' }}>BACKHUG</div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {menuItems.map((item) => {
                    const isActive = activeMenuItem === item.key;
                    const itemStyle = {
                        padding: '10px 20px', cursor: 'pointer', color: isActive ? '#1e40af' : '#6b7280', 
                        backgroundColor: isActive ? '#e0f2fe' : 'transparent', fontWeight: isActive ? '600' : 'normal',
                        borderLeft: isActive ? '4px solid #3b82f6' : '4px solid transparent', 
                    };
                    return (
                        <li key={item.key} style={itemStyle} onClick={() => setActiveMenuItem(item.key)}>
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
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: '0px', borderBottom: '1px solid #e5e7eb' }}>
                  <span style={{marginRight:'10px'}}>phuong</span>
                    <div style={{ fontWeight: 'bold', fontSize: '1.5em' }}></div>
                </div>
                <div  style={{ marginTop: '20px' }}>
                  <button 
                        onClick={() => setIsFormVisible(true)}
                        style={{ padding: '10px 16px', border: 'none', backgroundColor: '#10b981', color: 'white', borderRadius: '4px' }}
                    >
                        + Invite user
                    </button>
                    {activeMenuItem === 'users-management' ? (
                        <UsersTable users={users} ROWS_PER_PAGE={ROWS_PER_PAGE} />
                    ) : (
                        <h2 style={{ color: '#aaa' }}>day la: {activeMenuItem}</h2>
                    )}
                </div>
            </div>
            {isFormVisible && (
                <AddUserForm 
                    onClose={() => setIsFormVisible(false)} 
                    onAddUser={handleAddUser}
                />
            )}
        </div>
    );
}

export default Dashboard;
