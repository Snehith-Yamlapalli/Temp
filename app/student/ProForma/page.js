"use client";
import React, { useEffect, useState } from 'react'
import Spinner from '@/app/components/Spinner'
import { useRouter } from 'next/navigation'
// import as from "../"
const page = () => {
  const router = useRouter()

  const [data, setdata] = useState([])
  const [fulldata, setfulldata] = useState([])
  const [loading, setloading] = useState(false)

  async function getData() {
    setloading(true)
    const res = await fetch("/api/proforma");
    const proformadata = await res.json();
    setfulldata(proformadata);

    const filtered = proformadata.map(value => ({
      id: value.id,
      companyName: value.companyName,
      jobRole: value.jobRole,
      profile: value.profile,
      Deadline: value.Deadline,
    }
    ))
    setdata(filtered)
    setloading(false)
  }
  useEffect(() => {
    getData()
  }, []);

  function getproforma(id) {
    router.push(`/student/ProForma/view/${id}`);
  }


  if (loading) return <Spinner />

  return (
    <div className='container-fluid'>
      <div className='row'>
        <table className="table table-hover table-bordered border-secondary">
          <thead>
            <tr className='table-dark'>
              <td>S.no</td>
              <td>Company Name</td>
              <td>Role Name</td>
              <td>Profile</td>
              <td>DeadLine</td>
              <td>Actions</td>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {data.map((value) => (
              <tr key={value.id}>
                <td>-</td>
                <td>{value.companyName}</td>
                <td>{value.jobRole}</td>
                <td>{value.profile}</td>
               <td>{new Date(value.Deadline).toLocaleString()}</td>
                <td style={{ padding: 0 }}>
                  <button className='btn btn-secondary w-100 h-100 rounded-0' onClick={() => getproforma(value.id)}>View Proforma</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default page
