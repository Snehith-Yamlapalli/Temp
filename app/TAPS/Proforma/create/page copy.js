// app/TAPS/Proforma/create/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";

export default function CreateProformaPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [CompanyCategory, setCompanyCategory] = useState("")
  const [jobRole, setJobRole] = useState("")
  const [profile, setprofile] = useState("")
  const [Location, setLocation] = useState("");
  const [CTC, setCTC] = useState([]);
  const [CTCBase, setCTCBase] = useState([]);
  const [CTCStocks, setCTCStocks] = useState([]);
  const [CTCSignOn, setCTCSignOn] = useState([]);
  const [CTCReLoc, setCTCReLoc] = useState([]);
  const [CTCOth, setCTCOth] = useState([]);
  const [Internship, setInternship] = useState("")
  const [Internshipstipend, setInternshipStipend] = useState("")
  const [DriveMode, setDriveMode] = useState("ON_CAMPUS");
  const [cgpaCutoff, setCgpaCutoff] = useState("");
  const [Batch, setBatch] = useState("");
  const [eligibleBranches, setEligibleBranches] = useState("");
  const [DriveDates, setDriveDates] = useState([]);
  const [round1, setround1] = useState("")
  const [round2, setround2] = useState("")
  const [round3, setround3] = useState("")
  const [round4, setround4] = useState("")
  const [Deadline, setDeadline] = useState('');
  const [Spoc, setSpoc] = useState("");
  const [SpocCont, setSpocCont] = useState("");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);

  async function uploadFileToBlob(file) {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/uploads/presign", {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.error || "Upload failed");
    }

    return await res.json();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const auth = getAuth();

      const user = auth.currentUser;
      if (!user) {
        alert("Login required");
        setBusy(false);
        return;
      }
      const idToken = await user.getIdToken();

      let fileMeta = {};
      if (file) {
        fileMeta = await uploadFileToBlob(file);
      }

      const payload = {
        companyName,
        CompanyCategory,
        jobRole,
        profile,
        Location,
        CTC,CTCBase,CTCStocks,CTCSignOn,CTCReLoc,CTCOth,
        Internship,Internshipstipend,
        DriveMode,
        cgpaCutoff: cgpaCutoff ? Number(cgpaCutoff) : null,
        Batch,
        eligibleBranches: eligibleBranches ? eligibleBranches.split(",").map(s => s.trim()) : [],
        DriveDates,
        round1,round2,round3,round4,
        Deadline,
        Spoc,SpocCont,
        ...fileMeta,
      };

      const res = await fetch("/api/proforma", {
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
      alert("Proforma created");
      router.push("/TAPS");
    } catch (err) {
      console.error(err);
      alert("Create failed: " + (err.message || err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Proforma</h1>
      <form onSubmit={handleSubmit}>
        <div className="container rounded shadow-lg p-3 md-5">
          <div className="row">
            <div className="col-12">
              <h3 className="text-center mb-4">Company Details</h3>
            </div>
            <div className="col-md-8">
              <label>Company Name</label>
              <input type="text" className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </div>


            <div className="col-md-6 mt-3">
              <label>Company Category</label>
              <select className="form-control" value={CompanyCategory} onChange={(e) => setCompanyCategory(e.target.value)}>
                <option value="" disabled>-</option>
                <option value="GOVT">GOVT</option>
                <option value="MNC">MNC</option>
                <option value="PRIVATE">PRIVATE</option>
                <option value="PSU">PSU</option>
                <option value="LTD">LTD</option>
                <option value="NGO">NGO</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="row my-5">
            <div className="col-12">
              <h3 className="text-center mb-4">FTE Details</h3>
            </div>
            <div className="col-md-6">
              <label>Profile</label>
              <input type="text" className="form-control" value={profile} onChange={(e) => setprofile(e.target.value)} />
            </div>
            <div className="col-md-6 mt-3 mt-md-0">
              <label>Job Location</label>
              <input type="text" className="form-control" value={Location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="col-md-6 mt-3">
              <label>Nature of Business/ Role Name</label>
              <select className="form-control" value={jobRole} onChange={(e) => setJobRole(e.target.value)}>
                <option value="" disabled>-</option>
                <option value="Core Engg.">Core Engg.</option>
                <option value="IT/Software">IT/Software</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="Oil & Gas">Oil & Gas</option>
                <option value="Ed. Tech">Ed. Tech</option>
                <option value="Consulting">Consulting</option>
                <option value="R & D">R & D</option>
                <option value="Finance">Finance</option>
                <option value="Analytics">Analytics</option>
                <option value="Other">Other</option>
              </select>

            </div>

          </div>

          <div className="row my-5">
            <div className="col-12">
              <h3 className="text-center mb-4">CTC Break-up </h3>
            </div>
            <div className="col-md-2">
              <label>CTC</label>
              <input type="number" className="form-control" value={CTC} onChange={(e) => setCTC(e.target.value)} />
            </div>
            <div className="col-md-2 mt-3 mt-md-0">
              <label>Base</label>
              <input type="number" className="form-control" value={CTCBase} onChange={(e) => setCTCBase(e.target.value)} />
            </div>
            <div className="col-md-2 mt-3 mt-md-0">
              <label>Stocks</label>
              <input type="number" className="form-control" value={CTCStocks} onChange={(e) => setCTCStocks(e.target.value)} />
            </div>
            <div className="col-md-2 mt-3 mt-md-0">
              <label>Sign-On Bonus</label>
              <input type="number" className="form-control" value={CTCSignOn} onChange={(e) => setCTCSignOn(e.target.value)} />
            </div>
            <div className="col-md-2 mt-3 mt-md-0">
              <label>Re-Location</label>
              <input type="number" className="form-control" value={CTCReLoc} onChange={(e) => setCTCReLoc(e.target.value)} />
            </div>
            <div className="col-md-2 mt-3 mt-md-0">
              <label>Others</label>
              <input type="number" className="form-control" value={CTCOth} onChange={(e) => setCTCOth(e.target.value)} />
            </div>
          </div>

          <div className="row my-5">
            <div className="col-12">
              <h3 className="text-center mb-4">Internship Details</h3>
            </div>
            <div className="col-md-2">
              <label>Present</label>
              <select className="form-control" value={Internship} onChange={(e) => setInternship(e.target.value)}>
                <option value="" disabled>-</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="col-md-2 mt-3 mt-md-0">
              <label>Stipend</label>
              <input type="number" className="form-control" value={Internshipstipend} onChange={(e) => setInternshipStipend(e.target.value)} />
            </div>
          </div>
        </div>
        {/* /////////////////////////////////////////////////////////////////////// */}
        <div className="container rounded shadow-lg my-5">

          <div className="row">
            <div className="col-12 mt-4">
              <h3 className="text-center mb-4">Student Requirements</h3>
            </div>
            <div className="col-md-2">
              <label>Eligible Batch</label>
              <input type="number" className="form-control" value={Batch} onChange={(e) => setBatch(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label>Eligible Branches</label>
              <input type="text" className="form-control" value={eligibleBranches} onChange={(e) => setEligibleBranches(e.target.value)} />
            </div>
            <div className="col-md-2 ">
              <label>CGPA</label>
              <input type="number" className="form-control" value={cgpaCutoff} onChange={(e) => setCgpaCutoff(e.target.value)} />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12">
              <h3 className="text-center mb-4">Drive Details</h3>
            </div>
            <div className="col-md-2">
              <label>Drive Mode </label>
              <select className="form-control" value={DriveMode} onChange={(e) => setDriveMode(e.target.value)}>
                <option value="" disabled>-</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
            <div className="col-md-6">
              <label>Dates </label>
              <input type="text" className="form-control" value={DriveDates} onChange={(e) => setDriveDates(e.target.value)} />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12">
              <h3 className="text-center mb-4">Selection Procedure</h3>
            </div>
            <div className="col-md-6">
              <label>Round 1</label>
              <select className="form-control" value={round1} onChange={(e) => setround1(e.target.value)}>
                <option value="" disabled>-</option>

                <option value="Shortlist from Resume">Shortlist from Resume</option>
                <option value="Aptitude">Aptitude</option>
                <option value="Personal Interview">Personal Interview</option>
                <option value="Written Test">Written Test</option>
                <option value="Technical">Technical</option>
                <option value="HR">HR</option>
                <option value="Online Test">Online Test</option>
                <option value="Group Discussion">Group Discussion</option>
              </select>
            </div>

            <div className="col-md-6">
              <label>Round 2</label>
              <select className="form-control" value={round2} onChange={(e) => setround2(e.target.value)}>
                <option value="" disabled>-</option>

                <option value="Shortlist from Resume">Shortlist from Resume</option>
                <option value="Aptitude">Aptitude</option>
                <option value="Personal Interview">Personal Interview</option>
                <option value="Written Test">Written Test</option>
                <option value="Technical">Technical</option>
                <option value="HR">HR</option>
                <option value="Online Test">Online Test</option>
                <option value="Group Discussion">Group Discussion</option>
              </select>
            </div>

            <div className="col-md-6">
              <label>Round 3</label>
              <select className="form-control" value={round3} onChange={(e) => setround3(e.target.value)}>
                <option value="" disabled>-</option>

                <option value="Shortlist from Resume">Shortlist from Resume</option>
                <option value="Aptitude">Aptitude</option>
                <option value="Personal Interview">Personal Interview</option>
                <option value="Written Test">Written Test</option>
                <option value="Technical">Technical</option>
                <option value="HR">HR</option>
                <option value="Online Test">Online Test</option>
                <option value="Group Discussion">Group Discussion</option>
              </select>
            </div>

            <div className="col-md-6">
              <label>Round 4</label>
              <select className="form-control" value={round4} onChange={(e) => setround4(e.target.value)}>
                <option value="" disabled>-</option>

                <option value="Shortlist from Resume">Shortlist from Resume</option>
                <option value="Aptitude">Aptitude</option>
                <option value="Personal Interview">Personal Interview</option>
                <option value="Written Test">Written Test</option>
                <option value="Technical">Technical</option>
                <option value="HR">HR</option>
                <option value="Online Test">Online Test</option>
                <option value="Group Discussion">Group Discussion</option>
              </select>
            </div>

          </div>

          <div className="row mt-5 ">
            <div className="col-md-2">
              <h4>Dead Line</h4>
              <input type="date" className="form-control" value={Deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
            <div className="col-md-4">
              <h4>SPOC</h4>
              <input type="text" className="form-control" value={Spoc} onChange={(e) => setSpoc(e.target.value)} />
            </div>
            <div className="col-md-4">
              <h4>SPOC Contact</h4>
              <input type="tel" className="form-control" value={SpocCont} onChange={(e) => setSpocCont(e.target.value)} />
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}

//  <div className="col-md-6 m-4">
//           <h4>-af-</h4>
//           <input className="form-control" value={companyName}/>
//          </div>
// // fasdfafd
// <div>
//           <label>Company Name</label><br />
//           <input value={companyName} onChange={e => setCompanyName(e.target.value)} required />
//         </div>
//         <div>
//           <label>Job Role</label><br />
//           <input value={jobRole} onChange={e => setJobRole(e.target.value)} required />
//         </div>
//         <div>
//           <label>Drive Mode</label><br />
//           <select value={DriveMode} onChange={e => setDriveMode(e.target.value)}>
//             <option value="ONLINE">ON_CAMPUS</option>
//             <option value="ONSITE">OFF_CAMPUS</option>
//             <option value="HYBRID">HYBRID</option>
//           </select>
//         </div>
//         <div>
//           <label>CGPA Cutoff</label><br />
//           <input type="number" step="0.01" value={cgpaCutoff} onChange={e => setCgpaCutoff(e.target.value)} />
//         </div>
//         <div>
//           <label>Eligible Branches (comma separated)</label><br />
//           <input value={eligibleBranches} onChange={e => setEligibleBranches(e.target.value)} />
//         </div>
//         <div>
//           <label>Job Description (PDF)</label><br />
//           <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
//         </div>
//         {/* <div style={{ marginTop: 12 }}>
//           <button type="submit" disabled={busy}>{busy ? "Saving..." : "Create Proforma"}</button>
//         </div> */}