// app/student/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';

export default function Sidebar() {
    const pathname = usePathname() || "";

    // simple active check
    const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

    return (
        <aside className="border-end" style={{ width: 220, minHeight: "100vh", padding: 15 ,backgroundColor:"rgba(141,141,141)"}}>
            <div className="card mb-5">
                <div className="card-body">
                    <Image src="/NITW.png" width={100} height={90} style={{ paddingLeft: 15 }} alt="RAS" />
                    <p className="card-text pt-2">Recruitment Automation system</p>
                </div>
            </div>
            <nav className="nav nav-pills flex-column">
                <Link href="/student" className={`nav-link ${isActive("/student") ? "active" : ""}`}>Dashboard</Link>
                <Link href="/student/Calender" className={`nav-link ${isActive("/student/Calendar") ? "active" : ""}`}>Calendar</Link>
                <Link href="/student/ContactSpoc" className={`nav-link ${isActive("/student/ContactSpoc") ? "active" : ""}`}>Contact SPOC</Link>
                <Link href="/student/ManageResume" className={`nav-link ${isActive("/student/ManageResume") ? "active" : ""}`}>Manage Resume</Link>
                <Link href="/student/Notices" className={`nav-link ${isActive("/student/Notices") ? "active" : ""}`}>Notices</Link>
                <Link href="/student/ProForma" className={`nav-link ${isActive("/student/ProForma") ? "active" : ""}`}>ProForma</Link>
                <Link href="/student/WalkIn" className={`nav-link ${isActive("/student/WalkIn") ? "active" : ""}`}>WalkIn</Link>
                <Link href="/student/Stats" className={`nav-link ${isActive("/student/Stats") ? "active" : ""}`}>Stats</Link>
            </nav>
        </aside>
    );
}
