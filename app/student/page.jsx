"use client";
import Image from "next/image";
import { useState } from "react";
export default function student() {

  const [name, setname] = useState()
  const [branch, setbranch] = useState()
  const [rollno, setrollno] = useState()
  const [CGPA, setCGPA] = useState()

  return (
    <div className="container-fluid">
      <div className="row text-center">
        <h1>Student Details</h1>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="row m-3">
            <div className="col-md-4 bg-secondary">
              Name
            </div>
            <div className="col-md-8">
              <input type="text" className="form-control" value={name} readOnly={true} />
            </div>
          </div>
          <div className="row m-3">
            <div className="col-md-4 bg-secondary mb-3">
              Branch
            </div>
            <div className="col-md-8">
              <input type="text" className="form-control" value={branch} readOnly={true} />
            </div>
          </div>

          <div className="row m-3">
            <div className="col-md-4 bg-secondary mb-3">
              Roll No
            </div>
            <div className="col-md-8">
              <input type="text" className="form-control" value={rollno} readOnly={true} />
            </div>
          </div>

          <div className="row m-3">
            <div className="col-md-4 bg-secondary mb-3">
              CGPA
            </div>
            <div className="col-md-8">
              <input type="float" className="form-control" value={CGPA} readOnly={true} />
            </div>
          </div>

        </div>
        <div className="col-md-4 bg-success">
          <Image src="/homepageLogo.png" width={400} height={390} style={{ paddingLeft: 15 }} alt="Student profile photo" />
        </div>
      </div>
    </div>
  );
}
