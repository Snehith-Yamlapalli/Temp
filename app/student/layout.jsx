import Sidebar from "./Sidebar"
import AuthGuard from '../components/StudentAuthguard';
import "bootstrap-icons/font/bootstrap-icons.css";

export default function RootLayout({ children }) {
  return (
    <AuthGuard>
      <div className="d-flex" style={{ minHeight: "100vh", marginLeft: 220 }}>
        <Sidebar />
        <div className="flex-grow-1">
          <main className="p-4">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
