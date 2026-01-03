"use client";
import React, { useState } from 'react'
import { getAuth } from "firebase/auth";

const OffersPage = () => {
  const [rollno, setrollno] = useState("")
  const [name, setname] = useState("")
  const [company, setcompany] = useState("")
  const [degree, setdegree] = useState("")
  const [branch, setbranch] = useState("")
  const [role, setrole] = useState("")
  const [tag, settag] = useState("")

  async function handleFTE() {
    try {
      const auth = getAuth();

      const user = auth.currentUser;
      if (!user) {
        alert("Login required");
        setBusy(false);
        return;
      }
      const idToken = await user.getIdToken();


      const today = new Date()
      const year = today.getFullYear()

      const payload = {
        name,
        rollno,
        degree,
        branch,
        company,
        role,
        year
      };
      console.log(payload)

      const res = await fetch(`/api/FTE/${year}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(payload),
      });

      console.log(res)

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || res.statusText);
      }

      const created = await res.json();
      setname("")
      setbranch("")
      setcompany("")
      setdegree("")
      setrollno("")
      setrole("")
      alert("New Data added");

    } catch (err) {
      console.error(err);
      alert("Create failed: " + (err.message || err));
    }
  }
  async function handleintern() {
    try {
      const auth = getAuth();

      const user = auth.currentUser;
      if (!user) {
        alert("Login required");
        setBusy(false);
        return;
      }
      const idToken = await user.getIdToken();

      const today = new Date()
      const year = today.getFullYear()

      const payload = {
        name,
        rollno,
        degree,
        branch,
        company,
        role,
        year
      };
      console.log(payload)

      const res = await fetch(`/api/Interns/${year}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(payload),
      });

      console.log(res)

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || res.statusText);
      }

      const created = await res.json();
      alert("New Data added");
      setname("")
      setbranch("")
      setcompany("")
      setdegree("")
      setrollno("")
      setrole("")

    } catch (err) {
      console.error(err);
      alert("Create failed: " + (err.message || err));
    }
  }
  function showintern() {
    settag(true)
  }
  function showplacement() {
    settag(false)
  }

  return (
    <div style={{ padding: 20 }}>
      <div className="row">
        <h1>Offers</h1>
        <button className='btn btn-secondary col-md-4 m-3' onClick={showintern} style={{ backgroundColor: tag ? "rgb(39, 20, 20)" : "" }}>Internship</button>
        <button className='btn btn-secondary col-md-4 m-3' onClick={showplacement} style={{ backgroundColor: !tag ? "rgb(39, 0, 0)" : "" }}>Placement</button>
      </div>
      {!tag && <div className="container rounded shadow-lg p-3 md-5">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-4">Placement Offer</h1>
          </div>
          <div className="col-md-8 m-3">
            <label>Student Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setname(e.target.value)} />
          </div>
          <div className="col-md-4 m-3">
            <label>Roll Number</label>
            <input type="text" className="form-control" value={rollno} onChange={(e) => setrollno(e.target.value)} />
          </div>
          <div className="col-md-3 m-3">
            <label>Degree</label>
            <input type="text" className="form-control" value={degree} onChange={(e) => setdegree(e.target.value)} />
          </div>
          <div className="col-md-3 m-3">
            <label>Branch</label>
            <input type="text" className="form-control" value={branch} onChange={(e) => setbranch(e.target.value)} />
          </div>
          <div className="col-md-5 m-3">
            <label>Company Name </label>
            <input type="text" className="form-control" value={company} onChange={(e) => setcompany(e.target.value)} />
          </div>
          <div className="col-md-5 m-3">
            <label>Role Offered </label>
            <input type="text" className="form-control" value={role} onChange={(e) => setrole(e.target.value)} />
          </div>
          <button className='btn btn-primary' onClick={handleFTE}>Add Data</button>
        </div>
      </div>}
      {tag && <div className="container rounded shadow-lg p-3 md-5">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-4">Intern Offer</h1>
          </div>
          <div className="col-md-8 m-3">
            <label>Student Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setname(e.target.value)} />
          </div>
          <div className="col-md-4 m-3">
            <label>Roll Number</label>
            <input type="text" className="form-control" value={rollno} onChange={(e) => setrollno(e.target.value)} />
          </div>
          <div className="col-md-3 m-3">
            <label>Degree</label>
            <input type="text" className="form-control" value={degree} onChange={(e) => setdegree(e.target.value)} />
          </div>
          <div className="col-md-3 m-3">
            <label>Branch</label>
            <input type="text" className="form-control" value={branch} onChange={(e) => setbranch(e.target.value)} />
          </div>
          <div className="col-md-5 m-3">
            <label>Company Name </label>
            <input type="text" className="form-control" value={company} onChange={(e) => setcompany(e.target.value)} />
          </div>
          <div className="col-md-5 m-3">
            <label>Role Offered </label>
            <input type="text" className="form-control" value={role} onChange={(e) => setrole(e.target.value)} />
          </div>
          <button className='btn btn-primary' onClick={handleintern}>Add Data</button>
        </div>
      </div>}
    </div>
  )
}

export default OffersPage
