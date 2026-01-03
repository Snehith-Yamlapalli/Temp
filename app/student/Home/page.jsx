"use client";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Spinner from "@/app/components/Spinner";

const StudentHome = () => {
  const [loading, setloading] = useState(false)
  const [data, setdata] = useState("")
  const [name, setname] = useState("")
  const [email, setEmail] = useState("")
  const [rollno, setrollno] = useState("")
  const [branch, setbranch] = useState("")
  const [batch, setbatch] = useState("")
  const [degree, setdegree] = useState("")
  const [cgpaVerified, setcgpaverified] = useState("")
  const [cgpastudentupdate, setcgpastudentupdate] = useState("")
  const [internoffer, setinternoffer] = useState("")
  const [fteoffer, setfteoffer] = useState("")
  const [cgpa, setcgpa] = useState("")
  const [isLocked, setIsLocked] = useState(false);


  async function getData() {
    const auth = getAuth();
    const user = auth.currentUser;
    const roll = ((user.email).slice(2, 11)).toLocaleUpperCase()

    const res = await fetch(`/api/studentDetails/${roll}`);
    const details = await res.json()
    setdata(details)
    console.log(details)
    setname(details.name)
    setEmail(details.instituteEmail)
    setrollno(details.id)
    setdegree(details.degree)
    setcgpaverified(details.cgpaVerified)
    setbranch(details.branch)
    setbatch(details.batch)
    setinternoffer(details.InternOffer)
    setfteoffer(details.FTEOffer)
    setcgpa(details.CGPA)
    setcgpastudentupdate(details.cgpastudentupdate)

  }
  async function updateCGPA() {
    const payload = {
      cgpa,
      rollno
    }
    setloading(true)
    const id = rollno
    const res = await fetch(`/api/studentDetails/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.error || res.statusText);
    }
    setloading(false)
    setcgpastudentupdate(true)
    alert("CPGA updated successfully")
  }
  useEffect(() => {
    getData()
  }, [])

  if (loading || !data) return <Spinner />

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="row text-center shadow-lg m-3 p-3">
          <h1>Student Info</h1>

          <div className="col-md-6">
            <div className="row mb-3 align-items-center">
              <label className="col-md-4 text-end">Name</label>
              <div className="col-md-8">
                <input type="text" value={name} className="form-control" disabled />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-md-4 text-end">Roll No</label>
              <div className="col-md-8">
                <input type="text" value={rollno} className="form-control" disabled />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-md-4 text-end">Institute Email</label>
              <div className="col-md-8">
                <input type="text" value={email} className="form-control" disabled />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-md-4 text-end">Branch</label>
              <div className="col-md-8">
                <input type="text" value={branch} className="form-control" disabled />
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <label className="col-md-4 text-end">Degree</label>
              <div className="col-md-8">
                <input type="text" value={degree} className="form-control" disabled />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-md-4 text-end">Batch</label>
              <div className="col-md-8">
                <input type="text" value={batch} className="form-control" disabled />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-md-4 text-end">CGPA</label>
              <div className="col-md-6">
                <input type="number" step="0.01" value={cgpa ?? ""} className="form-control" max={10} min={0} readOnly={cgpastudentupdate} onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                    setcgpa("");
                    return;
                  }
                  if (/^\d+(\.\d{0,2})?$/.test(value)) {
                    setcgpa(value);
                  }
                }} />
              </div>

              <div className="col-md-2">
                <button className="btn btn-primary" disabled={cgpastudentupdate} onClick={updateCGPA}>Update</button>
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-md-4 text-end">Inter Offer</label>
              <div className="col-md-8">
                <input type="text" value={internoffer && internoffer.trim() !== "" ? internoffer : "-"} className="form-control" disabled />
              </div>
            </div>

            <div className="row mb-3 align-items-center">
              <label className="col-md-4 text-end">FTE Offer</label>
              <div className="col-md-8">
                <input type="text" value={fteoffer && fteoffer.trim() !== "" ? fteoffer : "-"} className="form-control" disabled />
              </div>
            </div>
          </div>

          <div className="col-md-4 m-3">
            {/* For Image */}
          </div>
        </div>
      </div>
    </div>

  )
}

export default StudentHome