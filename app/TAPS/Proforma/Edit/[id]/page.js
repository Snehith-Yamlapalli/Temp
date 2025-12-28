// app/TAPS/Proforma/edit/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAuth } from "firebase/auth";
import Spinner from "@/app/components/Spinner";

export default function EditProformaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [showJD, setShowJD] = useState(false)
  const [data, setdata] = useState(null)

  const [loading, setLoading] = useState(true);
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
  const [DriveMode, setDriveMode] = useState("");
  const [cgpaCutoff, setCgpaCutoff] = useState("");
  const [eligibleBatch, setBatch] = useState([]);
  const [eligibleBranches, setEligibleBranches] = useState([]);
  const [DriveDates, setDriveDates] = useState([]);
  const [round1, setround1] = useState("")
  const [round2, setround2] = useState("")
  const [round3, setround3] = useState("")
  const [round4, setround4] = useState("")
  const [Deadline, setDeadline] = useState('');
  const [Spoc, setSpoc] = useState("");
  const [SpocCont, setSpocCont] = useState("");
  const [JDURL, setJDURl] = useState("")

  const [file, setFile] = useState(null);
  const [existingMeta, setExistingMeta] = useState(null);
  const [busy, setBusy] = useState(false);

  async function LoadData() {
    setLoading(true);
    const res = await fetch(`/api/proforma/${id}`);
    const data = await res.json()
    setdata(data)

    setCompanyName(data.companyName || "");
    setCompanyCategory(data.CompanyCategory || "");
    setJobRole(data.jobRole || "");
    setprofile(data.profile || "");
    setLocation(data.Location || "");

    setCTC(data.CTC || []);
    setCTCBase(data.CTCBase || []);
    setCTCStocks(data.CTCStocks || []);
    setCTCSignOn(data.CTCSignOn || []);
    setCTCReLoc(data.CTCReLoc || []);
    setCTCOth(data.CTCOth || []);

    setInternship(data.Internship || "");
    setInternshipStipend(data.Internshipstipend || "");

    setDriveMode(data.driveMode || "");
    setCgpaCutoff(data.cgpaCutoff ?? "");
    setBatch((data.eligibleBatch || []).join(","));

    setEligibleBranches((data.eligibleBranches || []).join(","));

    setDriveDates(data.DriveDates || []);

    setround1(data.round1 || "");
    setround2(data.round2 || "");
    setround3(data.round3 || "");
    setround4(data.round4 || "");

    setDeadline(
      data.Deadline
        ? new Date(data.Deadline).toISOString().slice(0, 16)
        : ""
    );

    setSpoc(data.Spoc || "");
    setSpocCont(data.SpocCont || "");
    setJDURl(data.jobDescriptionUrl)

    setExistingMeta({
      jobDescriptionUrl: data.jobDescriptionUrl,
      jobDescriptionKey: data.jobDescriptionKey,
      jobDescriptionName: data.jobDescriptionName,
    });

    setLoading(false);
  }

  useEffect(() => {
    console.log(`ID IS ${id}`)
    if (!id || id === ":id" || id === "%3Aid")
      {
        alert("Come through Companies List page") 
        router.push("/TAPS/CompaniesList");
      }
    else LoadData()
  }, [id]);

  if (loading || !data) return <Spinner />

  async function uploadFileToBlob(file) {
    const presign = await fetch("/api/proformauploads/presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: file.name, contentType: file.type, size: file.size }),
    }).then(r => r.json());
    if (!presign?.uploadUrl) throw new Error("Presign failed");

    const up = await fetch(presign.uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });
    if (!up.ok) {
      const txt = await up.text();
      throw new Error("Upload failed: " + txt);
    }

    return {
      jobDescriptionUrl: presign.jobDescriptionUrl || presign.uploadUrl,
      jobDescriptionKey: presign.jobDescriptionKey,
      jobDescriptionName: file.name,
      jobDescriptionSize: file.size,
      jobDescriptionMime: file.type || "application/pdf",
    };
  }

  async function handleSave() {
    setBusy(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) { alert("Login required"); setBusy(false); return; }
      const idToken = await user.getIdToken();

      let fileMeta = {};
      if (file) {
        fileMeta = await uploadFileToBlob(file);
        // optionally: call server to delete old blob using existingMeta.jobDescriptionKey
      }

      const payload = {
        companyName,
        CompanyCategory,
        jobRole,
        profile,
        Location,
        CTC: CTC ? Number(CTC) : null,
        CTCBase: CTCBase ? Number(CTCBase) : null,
        CTCStocks: CTCStocks ? Number(CTCStocks) : null,
        CTCSignOn: CTCSignOn ? Number(CTCSignOn) : null,
        CTCReLoc: CTCReLoc ? Number(CTCReLoc) : null,
        CTCOth: CTCOth ? Number(CTCOth) : null,
        Internship,
        Internshipstipend: Internshipstipend ? Number(Internshipstipend) : 0,
        DriveMode,
        cgpaCutoff: cgpaCutoff ? Number(cgpaCutoff) : null,
        Batch: eligibleBatch ? eligibleBatch.split(",").map(s => s.trim()) : [],
        eligibleBranches: eligibleBranches ? eligibleBranches.split(",").map(s => s.trim()) : [],
        DriveDates,
        round1, round2, round3, round4,
        Deadline,
        Spoc, SpocCont,
        ...fileMeta,
      };

      const res = await fetch(`/api/proforma/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || res.statusText);
      }

      alert("Updated");
      router.push("/TAPS");
    } catch (err) {
      console.error(err);
      alert("Update failed: " + (err.message || err));
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Proforma</h1>

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
            <input type="tex" className="form-control" value={eligibleBatch} onChange={(e) => setBatch(e.target.value)} />
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
              <option value="ONLINE">Online</option>
              <option value="ONSITE">Offline</option>
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
            <input type="datetime-local" className="form-control" value={Deadline} onChange={(e) => setDeadline(e.target.value)} />
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

        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <input type="button" className="btn btn-outline-primary m-5" onClick={() => setShowJD(prev => !prev)} value={!showJD ? "Show JD" : "Close JD"} />
            <button className="btn btn-primary m-5" onClick={handleSave}>Save Changes</button>
          </div>
        </div>
        {showJD && (
          <iframe
            src={`${JDURL}#toolbar=0&navpanes=0&scrollbar=1`}
            width="100%"
            height="600px"
            style={{ border: "none" }}
          />
        )}

      </div>

    </div>
  );
}
