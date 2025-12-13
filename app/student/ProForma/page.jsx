// app/student/proforma/page.jsx
import React from "react";

export default async function StudentProformaPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}/api/proforma`, {
    // server fetch; if empty NEXT_PUBLIC_APP_URL it will be relative to current host
    cache: "no-store",
  });
  const data = await res.json().catch(() => []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Available Proformas</h2>
      <div style={{ overflowX: "auto" }}>
        <table className="table table-striped" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Role</th>
              <th>CGPA</th>
              <th>Branches</th>
              <th>Assessment Dates</th>
              <th>JD</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length ? data.map((p, idx) => (
              <tr key={p.id}>
                <td>{idx + 1}</td>
                <td>{p.companyName}</td>
                <td>{p.jobRole}</td>
                <td>{p.cgpaCutoff ?? "-"}</td>
                <td>{(p.eligibleBranches || []).join(", ")}</td>
                <td>{(p.assessmentDates || []).map(d => new Date(d).toLocaleDateString()).join(", ")}</td>
                <td>{p.jobDescriptionUrl ? <a href={p.jobDescriptionUrl} target="_blank" rel="noreferrer">Download</a> : "-"}</td>
              </tr>
            )) : (
              <tr><td colSpan={7}>No proformas found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
