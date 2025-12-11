<<<<<<< HEAD
// app/components/Header.tsx
"use client";
import Image from "next/image"
export default function Header() {
  return (
    <div className="container-fluid d-flex align-items-center justify-content-between px-4 py-2" style={{ backgroundColor: "rgba(235, 94, 94, 1)" }}>
      <div className="d-flex align-items-center gap-3">
        <Image src="/NITW.png" alt="nitw" width={100} height={100} />
        <Image src="/erp_nitw_hindi.png" alt="Nitw-hindi" width={260} height={90} />
      </div>
      <h5 className="m-0 fw-bold text-light d-none d-md-block"> Recruitment Automation System (RAS)</h5>
      <h6 className="m-0 fw-semibold text-end text-light d-none d-lg-block"> National Institute of Technology Warangal <br />Automation System – NITWAS</h6>
    </div>


  );
}
=======
// app/components/Header.tsx
"use client";
export default function Header() {
  return (
    <header className="navbar navbar-light bg-white border-bottom">
      <div className="container-fluid" style={{ backgroundColor: "rgba(235, 94, 94, 1)" }}>
        <img src="/NITW.png" alt="NITW" style={{ width: 100,height:100, padding: 20 }}/>
          <h5>National Institute of Technology Warangal Automation System - NITWAS</h5>
      </div>
    </header>
  );
}
>>>>>>> 2ba3b8fe8d16024817ed44cca7ca549c62421b81
