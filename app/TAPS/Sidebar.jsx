"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { getAuth } from "firebase/auth";
import "bootstrap/dist/js/bootstrap.bundle";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner";
import { useState } from "react"


export default function Sidebar() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const auth = getAuth();
    const user = auth.currentUser;

    const pathname = usePathname() || "";
    const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

    function NavSmileErp() {
        router.push("https://erp.nitw.ac.in/erp/secure/fw/selectsh")
    }
    const Logout = async () => {
        setLoading(true)
        console.log("set loading true called at LogOut")
        try {
            await auth.signOut();
            setLoading(false)
            router.push("/")
        } catch (error) {
            alert(error.message);
            console.log("error occured")
        }

    }
    if (loading) return <Spinner />

    return (
        <aside
            className="border-end"
            style={{
                width: 220, height: "100vh", overflowY: "auto", WebkitOverflowScrolling: "touch", position: "fixed", left: 0,
                top: 0, zIndex: 999, padding: 15, backgroundColor: "rgba(141,141,141)",
            }}>
            <div className="card mb-4">
                <div className="card-body">
                    <Image src="/NITW.png" width={100} height={90} style={{ paddingLeft: 15 }} alt="RAS" />
                    <p className="card-text pt-2">Recruitment Automation System</p>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-body">

                    <h5 className="card-title">{user.email}</h5>
                </div>
            </div>

            <nav className="nav nav-pills flex-column">
                <Link href="/TAPS/CompaniesList" className={`nav-link ${isActive("/TAPS/CompaniesList") ? "active" : ""}`} style={{ color: "black" }}>CompaniesList</Link>
                <Link href="/TAPS/Proforma/create" className={`nav-link ${isActive("/TAPS/Proforma/create") ? "active" : ""}`} style={{ color: "black" }}>Create Proforma</Link>
                <Link href="/TAPS/Proforma/Edit/:id" className={`nav-link ${isActive("/TAPS/Proforma/Edit/:id") ? "active" : ""}`} style={{ color: "black" }}>Edit Proforma</Link>
                <Link href="/TAPS/Stats" className={`nav-link ${isActive("/TAPS/Stats") ? "active" : ""}`} style={{ color: "black" }}>Stats</Link>
                <Link href="/TAPS/Issues" className={`nav-link ${isActive("/TAPS/Issues") ? "active" : ""}`} style={{ color: "black" }}>Issues</Link>
                <Link href="/TAPS/Calender" className={`nav-link ${isActive("/TAPS/Calender") ? "active" : ""}`} style={{ color: "black" }}>Calendar</Link>
            </nav>
            <div className="btn-group dropup pt-3 px-5">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"> <i className="bi bi-person"></i></button>
                <ul className="dropdown-menu">
                    <li>  <button className="dropdown-item" onClick={Logout}>Log-Out</button>      </li>
                </ul>
            </div>

        </aside>
    );
}

