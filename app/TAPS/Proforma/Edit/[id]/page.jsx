// app/TAPS/Proforma/edit/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAuth } from "firebase/auth";

export default function EditProformaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [driveMode, setDriveMode] = useState("ON_CAMPUS");
  const [cgpaCutoff, setCgpaCutoff] = useState("");
  const [eligibleBranches, setEligibleBranches] = useState("");
  const [file, setFile] = useState(null);
  const [existingMeta, setExistingMeta] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/proforma/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data?.error) throw new Error(data.error);
        setCompanyName(data.companyName || "");
        setJobRole(data.jobRole || "");
        setDriveMode(data.driveMode || "ON_CAMPUS");
        setCgpaCutoff(data.cgpaCutoff ?? "");
        setEligibleBranches((data.eligibleBranches || []).join(","));
        setExistingMeta({
          jobDescriptionUrl: data.jobDescriptionUrl,
          jobDescriptionKey: data.jobDescriptionKey,
          jobDescriptionName: data.jobDescriptionName,
        });
      })
      .catch(err => {
        console.error(err);
        alert("Failed to load proforma");
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function uploadFileToBlob(file) {
    const presign = await fetch("/api/uploads/presign", {
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

  async function handleSave(e) {
    e.preventDefault();
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
        jobRole,
        driveMode,
        cgpaCutoff: cgpaCutoff ? Number(cgpaCutoff) : null,
        eligibleBranches: eligibleBranches ? eligibleBranches.split(",").map(s => s.trim()) : [],
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
      <h2>Edit Proforma #{id}</h2>
      <form onSubmit={handleSave}>
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
          <select value={driveMode} onChange={e => setDriveMode(e.target.value)}>
            <option value="ON_CAMPUS">ON_CAMPUS</option>
            <option value="OFF_CAMPUS">OFF_CAMPUS</option>
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
          <label>Replace Job Description (optional)</label><br />
          <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
          {existingMeta?.jobDescriptionUrl ? (
            <div>
              <small>Existing: <a href={existingMeta.jobDescriptionUrl} target="_blank" rel="noreferrer">{existingMeta.jobDescriptionName || "download"}</a></small>
            </div>
          ) : null}
        </div>

        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={busy}>{busy ? "Saving..." : "Save Changes"}</button>
        </div>
      </form>
    </div>
  );
}
