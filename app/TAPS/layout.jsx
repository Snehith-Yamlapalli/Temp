import TPOAuthguard from "../components/TPOAuthguard";
import Sidebar from "./Sidebar";

export default function RootLayout({ children }) {
    return (
        <TPOAuthguard>
            <div className="d-flex" style={{ minHeight: "100vh", marginLeft: 220 }}>
                <Sidebar />
                <div className="flex-grow-1">
                    <main className="p-4">
                        {children}
                    </main>
                </div>
            </div>
        </TPOAuthguard>
    )
}