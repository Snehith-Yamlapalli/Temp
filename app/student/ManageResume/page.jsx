"use client";

import React, { useEffect, useRef, useState } from 'react'
import { getAuth } from "firebase/auth";

export default function ManageResumeImproved() {
  // state for already-uploaded names/urls
  const [CVurl, setCVurl] = useState({ 1: "", 2: "", 3: "" })
  const [CVname, setCVname] = useState({ 1: "", 2: "", 3: "" })

  // selected files per-slot
  const [files, setFiles] = useState({ 1: null, 2: null, 3: null })

  // loading states
  // initialLoading -> while fetching existing CV metadata
  // uploading -> per-slot upload state so only that button shows "Uploading..."
  const [initialLoading, setInitialLoading] = useState(true)
  const [uploading, setUploading] = useState({ 1: false, 2: false, 3: false })

  const inputRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
  }

  async function fetchdata(props) {
    try {
      setInitialLoading(true)
      const res = await fetch(`/api/studentDetails/${props}`);
      const details = await res.json()
      setCVurl({ 1: details.CV1Url, 2: details.CV2Url, 3: details.CV3Url })
      setCVname({ 1: details.CV1Name, 2: details.CV2Name, 3: details.CV3Name })
    } catch (err) {
      console.error('fetch error', err)
    } finally {
      setInitialLoading(false)
    }
  }

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const id = ((user?.email) || "").slice(2, 11).toLocaleUpperCase();
    if (id) fetchdata(id)
    else setInitialLoading(false)
  }, [])

  async function uploadFileToBlob(file) {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/proformauploads", {
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

  async function upload(cvnum) {
    try {
      setUploading(prev => ({ ...prev, [cvnum]: true }))

      const auth = getAuth();
      const user = auth.currentUser;
      const id = ((user.email).slice(2, 11)).toLocaleUpperCase();

      let fileMeta = {};
      const file = files[cvnum];
      if (file) {
        fileMeta = await uploadFileToBlob(file);
      }

      const payload = {
        DescriptionUrl: fileMeta.DescriptionUrl,
        DescriptionKey: fileMeta.DescriptionKey,
        DescriptionName: fileMeta.DescriptionName,
        rollno: id,
        cvnum: cvnum
      }
      const res = await fetch(`/api/CVInsertInStudentTable/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("CV uploaded successfully")
        // refresh names/urls after successful upload
        fetchdata(id)
        // clear selected file for that slot
        setFiles(prev => ({ ...prev, [cvnum]: null }))
      } else {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || res.statusText);
      }
    } catch (err) {
      console.error(err)
      alert(err.message || 'Upload failed')
    } finally {
      setUploading(prev => ({ ...prev, [cvnum]: false }))
    }
  }

  function handleChooseClick(cvnum) {
    inputRefs[cvnum].current?.click();
  }

  function handleFileChange(cvnum, e) {
    const f = e.target.files?.[0] || null;
    setFiles(prev => ({ ...prev, [cvnum]: f }));
  }

  return (
    <div className='container-fluid mx-3'>
      <h1 className='d-inline'>Manage CVs</h1>
      {/* small inline loader during initial fetch (doesn't fill whole page) */}
      {initialLoading && (
        <div className='d-inline-block ms-2 align-middle' role="status">
          <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {/* ------ CV Slot 1 ------ */}
      <div className='row align-items-center mt-4'>
        <div className='col-md-6'>
          <input type="text" readOnly value={files[1]?.name || CVname[1] || "No file selected"} className="form-control" />
          <input ref={inputRefs[1]} type="file" className="d-none" accept="application/pdf" onChange={e => handleFileChange(1, e)} />
        </div>
        <div className='col-md-2'>
          <button className='btn btn-outline-primary w-100' onClick={() => handleChooseClick(1)}>{CVname[1] ? 'Replace' : 'Choose'}</button>
        </div>
        <div className='col-md-2'>
          <button className='btn btn-primary w-100' onClick={() => upload(1)} disabled={uploading[1]}>{uploading[1] ? "Uploading..." : "Save / edit CV-1"}</button>
        </div>
        <div className='col-md-2'>
          {CVurl[1] && <a className='btn btn-secondary w-100' href={`${CVurl[1]}#toolbar=0&navpanes=0&scrollbar=1`} target="_blank" rel="noreferrer">View</a>}
        </div>
      </div>

      {/* ------ CV Slot 2 ------ */}
      <div className='row align-items-center mt-4'>
        <div className='col-md-6'>
          <input type="text" readOnly value={files[2]?.name || CVname[2] || "No file selected"} className="form-control" />
          <input ref={inputRefs[2]} type="file" className="d-none" accept="application/pdf" onChange={e => handleFileChange(2, e)} />
        </div>
        <div className='col-md-2'>
          <button className='btn btn-outline-primary w-100' onClick={() => handleChooseClick(2)}>{CVname[2] ? 'Replace' : 'Choose'}</button>
        </div>
        <div className='col-md-2'>
          <button className='btn btn-primary w-100' onClick={() => upload(2)} disabled={uploading[2]}>{uploading[2] ? "Uploading..." : "Save / edit CV-2"}</button>
        </div>
        <div className='col-md-2'>
          {CVurl[2] && <a className='btn btn-secondary w-100' href={`${CVurl[2]}#toolbar=0&navpanes=0&scrollbar=1`} target="_blank" rel="noreferrer">View</a>}
        </div>
      </div>

      {/* ------ CV Slot 3 ------ */}
      <div className='row align-items-center mt-4 mb-5'>
        <div className='col-md-6'>
          <input type="text" readOnly value={files[3]?.name || CVname[3] || "No file selected"} className="form-control" />
          <input ref={inputRefs[3]} type="file" className="d-none" accept="application/pdf" onChange={e => handleFileChange(3, e)} />
        </div>
        <div className='col-md-2'>
          <button className='btn btn-outline-primary w-100' onClick={() => handleChooseClick(3)}>{CVname[3] ? 'Replace' : 'Choose'}</button>
        </div>
        <div className='col-md-2'>
          <button className='btn btn-primary w-100' onClick={() => upload(3)} disabled={uploading[3]}>{uploading[3] ? "Uploading..." : "Save / edit CV-3"}</button>
        </div>
        <div className='col-md-2'>
          {CVurl[3] && <a className='btn btn-secondary w-100' href={`${CVurl[3]}#toolbar=0&navpanes=0&scrollbar=1`} target="_blank" rel="noreferrer">View</a>}
        </div>
      </div>

    </div>
  )
}
