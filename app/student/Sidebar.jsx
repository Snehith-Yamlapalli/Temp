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
          <h5 className="card-title">{user.displayName}</h5>
          <h5 className="card-title">{((user.email).slice(2, 11)).toLocaleUpperCase()}</h5>
        </div>
      </div>

      <nav className="nav nav-pills flex-column">
        <Link href="/student/Home" className={`nav-link ${isActive("/student/Home") ? "active" : ""}`} style={{ color: "black" }}>Home</Link>
        <Link href="/student/Stats" className={`nav-link ${isActive("/student/Stats") ? "active" : ""}`} style={{ color: "black" }}>Stats</Link>
        <Link href="/student/Notices" className={`nav-link ${isActive("/student/Notices") ? "active" : ""}`} style={{ color: "black" }}>Notices</Link>
        <Link href="/student/ManageResume" className={`nav-link ${isActive("/student/ManageResume") ? "active" : ""}`} style={{ color: "black" }}>Manage Resume</Link>
        <Link href="/student/PVF" className={`nav-link ${isActive("/student/PVF") ? "active" : ""}`} style={{ color: "black" }}>Manage PVF's</Link>
        <Link href="/student/Applications" className={`nav-link ${isActive("/student/Applications") ? "active" : ""}`} style={{ color: "black" }}>Your Applications</Link>
        <Link href="/student/ProForma" className={`nav-link ${isActive("/student/ProForma") ? "active" : ""}`} style={{ color: "black" }}>ProForma</Link>
        <Link href="/student/Calender" className={`nav-link ${isActive("/student/Calender") ? "active" : ""}`} style={{ color: "black" }}>Calendar</Link>
        <Link href="/student/WalkIn" className={`nav-link ${isActive("/student/WalkIn") ? "active" : ""}`} style={{ color: "black" }}>WalkIn</Link>
        <Link href="/student/ContactSpoc" className={`nav-link ${isActive("/student/ContactSpoc") ? "active" : ""}`} style={{ color: "black" }}>Contact SPOC</Link>
      </nav>
      <div className="btn-group dropup pt-3 px-5">
        <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"> <i className="bi bi-person"></i></button>
        <ul className="dropdown-menu">
          <li>  <button className="dropdown-item" onClick={NavSmileErp} >NITWAS</button>  </li>
          <li>  <button className="dropdown-item" onClick={Logout}>Log-Out</button>      </li>
        </ul>
      </div>

    </aside>
  );
}


// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";

// export default function Sidebar() {
//     const pathname = usePathname() || "";

//     // simple active check
//     const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

//     return (
//         <aside className="border-end" style={{ width: 220, minHeight: "100vh", overflowY: "auto",WebkitOverflowScrolling: "touch",
//         position: "fixed",left: 0,top: 0,zIndex: 999,  padding: 15, backgroundColor: "rgba(141,141,141)"}}>
//             <div className="card mb-5">
//                 <div className="card-body">
//                     <Image src="/NITW.png" width={100} height={90} style={{ paddingLeft: 15 }} alt="RAS"/>
//                     <p className="card-text pt-2">Recruitment Automation System</p>
//                 </div>
//             </div>

//             <nav className="nav nav-pills flex-column">
//                 <Link href="/student" className={`nav-link ${isActive("/student") ? "active" : ""}`}>Dashboard</Link>
//                 <Link href="/student/Calender" className={`nav-link ${isActive("/student/Calender") ? "active" : ""}`}>Calendar</Link>
//                 <Link href="/student/ContactSpoc" className={`nav-link ${isActive("/student/ContactSpoc") ? "active" : ""}`}>Contact SPOC</Link>
//                 <Link href="/student/ManageResume" className={`nav-link ${isActive("/student/ManageResume") ? "active" : ""}`}>Manage Resume</Link>
//                 <Link href="/student/Notices" className={`nav-link ${isActive("/student/Notices") ? "active" : ""}`}>Notices</Link>
//                 <Link href="/student/ProForma" className={`nav-link ${isActive("/student/ProForma") ? "active" : ""}`}>ProForma</Link>
//                 <Link href="/student/WalkIn" className={`nav-link ${isActive("/student/WalkIn") ? "active" : ""}`}>WalkIn</Link>
//                 <Link href="/student/Stats" className={`nav-link ${isActive("/student/Stats") ? "active" : ""}`}>Stats</Link>
//             </nav>
//         </aside>
//     );
// }