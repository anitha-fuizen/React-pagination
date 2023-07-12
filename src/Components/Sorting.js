/* eslint-disable jsx-a11y/anchor-is-valid */
import React ,{ useState,useEffect } from "react";
import axios from "axios";




const Sorting = () => {
const [data,setData]=useState([])
const [sortdata,setSortdata]=useState({sortdata:"id",reversed:false})
const [searchterm,setSearchterm]=useState('')
const [currentpage,setCurrentpage]=useState(1)
const recordsperpage=4
const lastindex=currentpage*recordsperpage
const firstindex=lastindex-recordsperpage
const records=data.slice(firstindex,lastindex)
const npage=Math.ceil(data.length/recordsperpage)
const numbers=[...Array(npage+1).keys()].slice(1)

const sortByName=()=>{
   debugger
    setSortdata({sorted:"name", reversed:!sortdata.reversed})
    const userData=[...data]
    userData.sort((userA,userB)=>{
        if (sortdata.reversed){
            return (userB.name).localeCompare(userA.name)
        }
        return (userA.name).localeCompare(userB.name)

    })
    setData(userData)

}

const search=(e)=>{
   const finalresult=records.filter((event)=>(
    event.name.toLowerCase().includes(e.target.value.toLowerCase())
   ))
   setData(finalresult)
   setSearchterm(e.target.value)
}
    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    },[])
  return (
    <>
    <input type='text' placeholder='search...' value={searchterm} onChange={search}></input>
    <table>
          <thead>
              <tr>
            <th>ID</th>
              <th onClick={sortByName}>NAME </th>
              <th>EMAIl </th>
          </tr>
      </thead>
      <tbody>
              {records.map((item, i) => (
                  <tr key={i}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>

                  </tr>

              ))}
          </tbody>
            </table>
            <nav>
            <ul>
                <li>
                    <a href="#" onClick={prevpage}> PrePage</a>
                    {numbers.map((index,i)=>(
                      <li key={index}><a href='#' onClick={()=>changecpage(i)}>{i}</a>
                      </li>
                    ))}
                </li>
                <li>
                    <a href="#" onClick={nextpage}> nextPage</a>
                </li>
                </ul>
            </nav>
            </>
  )
  function prevpage(){
    if(currentpage !==1){
     setCurrentpage(currentpage-1)
    }
    console.log(records);
 
   }
   function changecpage(id){
    setCurrentpage(id)
  }

  function nextpage(){
    if(currentpage !==npage){
      setCurrentpage(currentpage+1)
     }
     
     console.log(records);
  }
}


export default Sorting