// app/TAPS/Proforma/create/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";

export default function CreateProformaPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [DriveMode, setDriveMode] = useState("ON_CAMPUS");
  const [cgpaCutoff, setCgpaCutoff] = useState("");
  const [eligibleBranches, setEligibleBranches] = useState("");
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


  // async function uploadFileToBlob(file) 
  // {
  //   const presign = await fetch("/api/uploads/presign", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ name: file.name, contentType: file.type, size: file.size }),
  //   }).then(r => r.json());

  //   if (!presign?.uploadUrl) throw new Error("Presign failed");

  //   // upload directly
  //   const up = await fetch(presign.uploadUrl, {
  //     method: "PUT",
  //     headers: { "Content-Type": file.type },
  //     body: file,
  //   });
  //   if (!up.ok) {
  //     const txt = await up.text();
  //     throw new Error("Upload failed: " + txt);
  //   }

  //   return {
  //     jobDescriptionUrl: presign.jobDescriptionUrl || presign.uploadUrl,
  //     jobDescriptionKey: presign.jobDescriptionKey,
  //     jobDescriptionName: file.name,
  //     jobDescriptionSize: file.size,
  //     jobDescriptionMime: file.type || "application/pdf",
  //   };
  // }

  async function handleSubmit(e) 
  {
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
        jobRole,
        DriveMode,
        cgpaCutoff: cgpaCutoff ? Number(cgpaCutoff) : null,
        eligibleBranches: eligibleBranches ? eligibleBranches.split(",").map(s => s.trim()) : [],
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
      <h2>Create Proforma (TPO)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name</label><br />
          <input value={companyName} onChange={e => setCompanyName(e.target.value)} required />
        </div>
        <div>
          <label>Job Role</label><br />
          <input value={jobRole} onChange={e => setJobRole(e.target.value)} required />
        </div>
        <div>
          <label>Drive Mode</label><br />
          <select value={DriveMode} onChange={e => setDriveMode(e.target.value)}>
            <option value="ONLINE">ON_CAMPUS</option>
            <option value="ONSITE">OFF_CAMPUS</option>
            <option value="HYBRID">HYBRID</option>
          </select>
        </div>
        <div>
          <label>CGPA Cutoff</label><br />
          <input type="number" step="0.01" value={cgpaCutoff} onChange={e => setCgpaCutoff(e.target.value)} />
        </div>
        <div>
          <label>Eligible Branches (comma separated)</label><br />
          <input value={eligibleBranches} onChange={e => setEligibleBranches(e.target.value)} />
        </div>
        <div>
          <label>Job Description (PDF)</label><br />
          <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={busy}>{busy ? "Saving..." : "Create Proforma"}</button>
        </div>
      </form>
    </div>
  );
}
