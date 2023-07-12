/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */

import './App.css';
import Example from './Components/Useffect';
import Data from './Components/Data.json'
import { useState } from 'react';
//import {AiOutlineArrowUp, AiOutlineArrowDown} from "react-icons/ai";
import Sorting from './Components/Sorting';

function App() {
  
  const [sorted,setSorted]=useState({sorted:"id",reversed:false})
  const [currentpage,setCurrentpage]=useState(1)
  const recordsperpage=5
  const lastindex=currentpage*recordsperpage
  const firstindex=lastindex-recordsperpage
  const records=Data.slice(firstindex,lastindex)
  const [data,setData]=useState(records)
  const npage=Math.ceil(Data.length/recordsperpage)
  const numbers=[...Array(npage+1).keys()].slice(1)

  




const sortByName=()=>{
  // debugger
  console.log("its working")
  setSorted({sorted:"Name", reversed:!sorted.reversed})
  const userData=[...data]
  //  console.log(data)
  // console.log(userData)
  userData.sort((userA,userB)=>{
    if (sorted.reversed){
        return (userB.Name).localeCompare(userA.Name)
    }
    else {
      return (userA.Name).localeCompare(userB.Name)
    }

})
setData(userData)
  

}


 


  return (
    <>
   <Example/>
   <Sorting/>
   
    <table>
     <thead>
      <tr>
      <th >ID
     
      </th>
      <th onClick={sortByName}>Name
     
      </th>
      <th>Email</th>
      </tr>
     </thead>
     <tbody>
       {data.map((data,i)=>(
        
          <tr key={i}>
          <td>{data.ID}</td>
          <td>{data.Name}</td>
          <td>{data.email}</td>

          </tr>
       ))}
     </tbody>
   </table>
   <nav>
    <ul className='pagination'>
      <li>
        <a href='#' onClick={prevpage}>pre</a>
      </li>
      {
        numbers.map((num,i)=>(
          <li key={i}>
            <a href='#'  onClick={()=>changecpage(num)}>{num}</a>
          </li>
        ))
      }
       <li>
        <a href='#'  onClick={nextpage}>next</a>
      </li>
    </ul>
   </nav>
   </>
  );
  function prevpage(){
   if(currentpage !==1){
    setCurrentpage(currentpage-1)
   }
   console.log(records);

  }

  function changecpage(ID){
    setCurrentpage(ID)
  }

  function nextpage(){
    if(currentpage !==npage){
      setCurrentpage(currentpage+1)
     }
     
     console.log(records);
  } 
}

export default App;
