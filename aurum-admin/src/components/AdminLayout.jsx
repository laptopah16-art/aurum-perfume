import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 z-50">
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen bg-black">
        <Header />
        
        {/* Main Content - render children or Outlet */}
        <main className="flex-1 overflow-y-auto p-6 pt-20 bg-black">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

