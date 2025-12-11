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
