"use client";

import { useState } from "react"
const Stats = () => {
  const [tag, settag] = useState(true)
  const date = new Date()
  const year = date.getFullYear()

  const internsdata = [
    { name: "Rohit", roll: "22CS1001", company: "Amazon", profile: "SDE", branch: "CSE" },
    { name: "Rohit", roll: "22CS10021", company: "Amazon", profile: "SDE", branch: "CSE" },
    { name: "Rohit", roll: "22CS13001", company: "Amazon", profile: "SDE", branch: "CSE" },
    { name: "Rohit", roll: "22CS10301", company: "Amazon", profile: "SDE", branch: "CSE" },
  ];
  const placementdata = [];

  function showintern() {
    settag(true)
  }
  function showplacement() {
    settag(false)
  }

  return (
    <div>
      <div className='container-fluid'>
        <div className="row">
          <h1>NIT-Warangal Placement Stats</h1>
          <button className='btn btn-secondary col-md-4 m-3' onClick={showintern} style={{backgroundColor:tag ? "rgb(39, 20, 20)" :""}}>Internship</button>
          <button className='btn btn-secondary col-md-4 m-3' onClick={showplacement} style={{backgroundColor:!tag ? "rgb(39, 0, 0)" :""}}>Placement</button>
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
                  <th>Branch</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {internsdata.map((item) => (
                  <tr key={item.roll}>
                    <td>{item.name}</td>
                    <td>{item.roll}</td>
                    <td>{item.company}</td>
                    <td>{item.profile}</td>
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
                  <th>Branch</th>
                </tr>
              </thead>
              {placementdata.map((item, key) => (
                <tbody className='table-group-divider'>
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.roll}</td>
                    <td>{item.company}</td>
                    <td>{item.profile}</td>
                    <td>{item.branch}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Stats
