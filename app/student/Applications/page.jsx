"use client";

import { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import Spinner from '@/app/components/Spinner'


const Applicationspage = () => {
  const [loading, setloading] = useState(false)
  const [data, setdata] = useState(null)
  const [rollno, setrollno] = useState("")

  async function getAppliedData() {
    const auth = getAuth()
    const user = auth.currentUser
    const id = ((user.email).slice(2, 11)).toLocaleUpperCase()
    console.log("ROll nos ", id)
    const res = await fetch(`/api/applications/${id}`)
    const fetchedData = await res.json()
    console.log(fetchedData)
    setdata(fetchedData)
  }
  async function CancelApplication(props) {
    setloading(true)
    console.log("PROPS", props)
    const res = await fetch(`/api/applications/${props}`, {
      method: "DELETE"
    })
    const mssg = await res.json()
    alert(mssg.message)
    console.log(mssg.message)
    setloading(false)
  }

  useEffect(() => {
    getAppliedData()
  }, [])

  if (loading || !data) return <Spinner />

  return (
    <div>
      <table className="table table-hover table-bordered border-secondary">
        <thead>
          <tr className='table-dark'>
            <td>S.no</td>
            <td>Company Name</td>
            <td>Role</td>
            <td>Profile</td>
            <td>Resume</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((value,index) => (
            <tr key={value.id}>
              <td>{index+1}</td>
              <td>{value.Company}</td>
              <td>{value.role}</td>
              <td>{value.profile}</td>
              <td>CV{value.ResumeNo}</td>
              <td>{value.status}</td>
              <td style={{ padding: 0 }}>
                <button className='btn btn-secondary w-100 h-100 rounded-0' onClick={() => CancelApplication(value.id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Applicationspage
