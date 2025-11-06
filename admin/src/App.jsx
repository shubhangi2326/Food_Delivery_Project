import React from 'react';
// ... other imports
import List from './pages/List/List';

const App = () => {
    // YEH LINE SABSE ZAROORI HAI
    const url = import.meta.env.VITE_BACKEND_URL;

    return (
        <div>
            {/* ... Navbar, ToastContainer etc ... */}
            <div className="app-content">
                <Sidebar />
                <Routes>
                    <Route path="/add" element={<Add url={url} />} />
                    {/* url ko props ke zariye bhejein */}
                    <Route path="/list" element={<List url={url} />} />
                    <Route path="/orders" element={<Orders url={url} />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;