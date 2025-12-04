// app/student/layout.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar"; // client component (below)

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1">
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
