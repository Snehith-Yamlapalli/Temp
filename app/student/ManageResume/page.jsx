"use client";

import React from 'react'
import { useState } from 'react';
import { getAuth } from "firebase/auth";


const ManageResume = () => {
  const [file, setFile] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const id = ((user.email).slice(2, 11)).toLocaleUpperCase();

  async function uploadFileToBlob(file, props) {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch(`/api/CVuploads/${props}`, {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);

      if (res.status === 409) {
        alert("Same CV already uploaded");
        return; 
      }
      throw new Error(err?.error || "Upload failed");
    }

    return await res.json();
  }


  async function asd(props) {
    let fileMeta = {};
    const newId = id + "-" + props;
    console.log(`newId is ${newId}`)
    if (file) {
      fileMeta = await uploadFileToBlob(file, newId);
    }
    console.log(fileMeta)
  }

  return (
    <div>
      <div className="mt-5">
        <label>Job Description (PDF)</label><br />
        <input type="file" className="form-control" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
        <button className='btn btn-primary m-3' onClick={() => asd(1)}>Save/Edit CV-1</button>
        <button className='btn btn-primary m-3' onClick={() => asd(2)}>Save/Edit CV-2</button>
        <button className='btn btn-primary m-3' onClick={() => asd(3)}>Save/Edit CV-3</button>
      </div>
    </div>
  )
}

export default ManageResume
