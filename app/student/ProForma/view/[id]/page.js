"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from '@/app/components/Spinner'


const ViewProForma = () => {

  const [loading, setloading] = useState(false)
  const [showJD, setShowJD] = useState(false)
  const [data, setdata] = useState(null)
  const { id } = useParams();
  const [isExpired, setIsExpired] = useState(false);

  async function getData() {
    setloading(true);
    const res = await fetch(`/api/proforma/${id}`);
    const selected = await res.json()
    setdata(selected)

    const expired = Date.now() > new Date(selected.Deadline).getTime();
    setIsExpired(expired);

    // should check for Student CGPA,Branch,Batch 

    setloading(false)
  }
  useEffect(() => {
    getData()
  }, [id])
  if (loading || !data) return <Spinner />

  function ApplyforJob() {
    alert("OK Bro, Your Job application sent!")
  }

  return (
    <div style={{ padding: 20 }}>
      <div className="container rounded shadow-lg p-3 md-5">
        <div className="row">
          <div className="col-12">
            <h3 className="text-center mb-4">Company Details</h3>
          </div>
          <div className="col-md-8">
            <label>Company Name</label>
            <input type="text" className="form-control" value={data.companyName} readOnly={true} />
          </div>
          <div className="col-md-6 mt-3">
            <label>Company Category</label>
            <input type="text" className="form-control" value={data.CompanyCategory} readOnly={true} />
          </div>
        </div>

        <div className="row my-5">
          <div className="col-12">
            <h3 className="text-center mb-4">FTE Details</h3>
          </div>
          <div className="col-md-6">
            <label>Profile</label>
            <input type="text" className="form-control" value={data.profile} readOnly={true} />
          </div>
          <div className="col-md-6 mt-3 mt-md-0">
            <label>Job Location</label>
            <input type="text" className="form-control" value={data.Location} readOnly={true} />
          </div>
          <div className="col-md-6 mt-3">
            <label>Nature of Business/ Role Name</label>
            <input type="text" className="form-control" value={data.jobRole} readOnly={true} />
          </div>

        </div>

        <div className="row my-5">
          <div className="col-12">
            <h3 className="text-center mb-4">CTC Break-up </h3>
          </div>
          <div className="col-md-2">
            <label>CTC</label>
            <input type="number" className="form-control" value={data.CTC} readOnly={true} />
          </div>
          <div className="col-md-2 mt-3 mt-md-0">
            <label>Base</label>
            <input type="number" className="form-control" value={data.CTCBase} readOnly={true} />
          </div>
          <div className="col-md-2 mt-3 mt-md-0">
            <label>Stocks</label>
            <input type="number" className="form-control" value={data.CTCStocks} readOnly={true} />
          </div>
          <div className="col-md-2 mt-3 mt-md-0">
            <label>Sign-On Bonus</label>
            <input type="number" className="form-control" value={data.CTCSignOn} readOnly={true} />
          </div>
          <div className="col-md-2 mt-3 mt-md-0">
            <label>Re-Location</label>
            <input type="number" className="form-control" value={data.CTCReLoc} readOnly={true} />
          </div>
          <div className="col-md-2 mt-3 mt-md-0">
            <label>Others</label>
            <input type="number" className="form-control" value={data.CTCOth} readOnly={true} />
          </div>
        </div>

        <div className="row my-5">
          <div className="col-12">
            <h3 className="text-center mb-4">Internship Details</h3>
          </div>
          <div className="col-md-2">
            <label>Present</label>
            <input type="text" className="form-control" value={data.Internship} readOnly={true} />
          </div>
          <div className="col-md-2 mt-3 mt-md-0">
            <label>Stipend</label>
            <input type="number" className="form-control" value={data.Internshipstipend} readOnly={true} />
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
            <input type="number" className="form-control" value={data.eligibleBatch} readOnly={true} />
          </div>
          <div className="col-md-6">
            <label>Eligible Branches</label>
            <input type="text" className="form-control" value={data.eligibleBranches} readOnly={true} />
          </div>
          <div className="col-md-2 ">
            <label>CGPA</label>
            <input type="number" className="form-control" value={data.cgpaCutoff} readOnly={true} />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <h3 className="text-center mb-4">Drive Details</h3>
          </div>
          <div className="col-md-2">
            <label>Drive Mode </label>
            <input type="text" className="form-control" value={data.DriveMode} readOnly={true} />
          </div>
          <div className="col-md-6">
            <label>Dates </label>
            <input type="text" className="form-control" value={data.DriveDates} readOnly={true} />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <h3 className="text-center mb-4">Selection Procedure</h3>
          </div>
          <div className="col-md-6">
            <label>Round 1</label>
            <input type="text" className="form-control" value={data.round1} readOnly={true} />
          </div>

          <div className="col-md-6">
            <label>Round 2</label>
            <input type="text" className="form-control" value={data.round2} readOnly={true} />
          </div>

          <div className="col-md-6">
            <label>Round 3</label>
            <input type="text" className="form-control" value={data.round3} readOnly={true} />
          </div>

          <div className="col-md-6">
            <label>Round 4</label>
            <input type="text" className="form-control" value={data.round4} readOnly={true} />
          </div>

        </div>
        <div className="row mt-5 ">
          <div className="col-md-2">
            <h4>Dead Line</h4>
            <input type="datetime-local" className="form-control" value={data?.Deadline ? new Date(data.Deadline).toISOString().slice(0, 16) : ""} readOnly={true} />
          </div>
          <div className="col-md-4">
            <h4>SPOC</h4>
            <input type="text" className="form-control" value={data.Spoc} readOnly={true} />
          </div>
          <div className="col-md-4">
            <h4>SPOC Contact</h4>
            <input type="tel" className="form-control" value={data.SpocCont} readOnly={true} />
          </div>
        </div>

        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <input type="button" className="btn btn-outline-primary m-5" onClick={() => setShowJD(prev => !prev)} value={!showJD ? "Show JD" : "Close JD"} />
            <button className="btn btn-primary m-5" disabled={isExpired} onClick={ApplyforJob}>Apply</button>
          </div>
        </div>


        {showJD && (
          <iframe
            src={`${data.jobDescriptionUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            width="100%"
            height="600px"
            style={{ border: "none" }}
          />
        )}

      </div>

    </div>
  );
};

export default ViewProForma;
