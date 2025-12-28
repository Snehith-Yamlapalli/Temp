"use client";

import { useState } from "react"
import { useEffect } from "react";
import Spinner from "@/app/components/Spinner";


const Stats = () => {
  const [tag, settag] = useState(true)
  const [internsdata, setinterndata] = useState([])
  const [placementdata, setplacementdata] = useState([])
  const [loading, setloading] = useState(false)
  const date = new Date()
  const year = date.getFullYear()



  ///////////////////////////////////////////////////////////////////////////////////////
  async function getPlacementData() {
    setloading(true)
    const res = await fetch("/api/FTE");
    console.log(`res data is ${res}`)
    const FTE = await res.json();
    console.log(`FTE data is ${FTE}`)

    const filtered = FTE.map(value => ({
      name: value.name,
      company: value.company,
      role: value.role,
      rollno: value.rollno,
      degree: value.degree,
      branch: value.branch,
      year: value.year
    }
    ))
    setplacementdata(filtered)
    setloading(false)
  }
  async function getInternData() {
    setloading(true)
    const res = await fetch("/api/Interns");
    const Intern = await res.json();

    const filtered = Intern.map(value => ({
      id: value.rollno,
      name: value.name,
      company: value.company,
      role: value.role,
      rollno: value.rollno,
      degree: value.degree,
      branch: value.branch,
      year: value.year
    }
    ))
    setinterndata(filtered)
    setloading(false)
  }
  useEffect(() => {
    getPlacementData()
    getInternData()
  }, []);

  function showintern() {
    settag(true)
  }
  function showplacement() {
    settag(false)
  }
  if (loading) return <Spinner />

  return (
    <div>
      <div className='container-fluid'>
        <div className="row">
          <h1>NIT-Warangal Placement Stats</h1>
          <button className='btn btn-secondary col-md-4 m-3' onClick={showintern} style={{ backgroundColor: tag ? "rgb(39, 20, 20)" : "" }}>Internship</button>
          <button className='btn btn-secondary col-md-4 m-3' onClick={showplacement} style={{ backgroundColor: !tag ? "rgb(39, 0, 0)" : "" }}>Placement</button>
        </div>
        {tag && <div className='row'> {/* Internship  */}
          <h1>Internship {year} - {year + 1} </h1>
          <h2 className="mt-3">Stats</h2>
          <div className="table-responsive">
            <table className='table table-hover table-bordered'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Company</th>
                  <th>Profile</th>
                  <th>Degree</th>
                  <th>Branch</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {internsdata.map((item) => (
                  <tr key={item.rollno}>
                    <td>{item.name}</td>
                    <td>{item.rollno}</td>
                    <td>{item.company}</td>
                    <td>{item.role}</td>
                    <td>{item.degree}</td>
                    <td>{item.branch}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>}


        {!tag && <div className='row'> {/* Full Time Employment  */}
          <h1>Placements {year} - {year + 1} </h1>
          <h2>Stats</h2>
          <div className="table-responsive">
            <table className='table table-hover table-bordered'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Company</th>
                  <th>Profile</th>
                  <th>Degree</th>
                  <th>Branch</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {placementdata.map((item) => (
                  <tr key={item.rollno}>
                    <td>{item.name}</td>
                    <td>{item.rollno}</td>
                    <td>{item.company}</td>
                    <td>{item.role}</td>
                    <td>{item.degree}</td>
                    <td>{item.branch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Stats
