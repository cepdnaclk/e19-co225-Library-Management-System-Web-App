import React from 'react';
import "./styles.css";
import { useState} from "react";

var data = require("./New_Data.json");

const MemberDashboard = () => {
  const [value,setValue]= useState('');
  const onChange = (event) => {
    setValue(event.target.value);
  }
  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // our api to fetch the search result
    console.log('search',searchTerm);
  }
  
    return (
      <div>
        <h1>Search</h1>
        <div className="Search-container">
        <div className="Search-inner">
          <input type="text" value={value} onChange={onChange}/>
          <button onClick={() => onSearch(value)}> Search</button>
        </div>
        <div className='dropdown'>
          {data.filter(item =>
        { const searchTerm  =value.toLowerCase();
          const fullname = item.full_name.toLowerCase();
          return searchTerm && fullname.startsWith(searchTerm) && fullname !==searchTerm;

          }).slice(0,10)
           .map((item) => (
            <div onClick={()=>onSearch(item.full_name)} className='dropdown-row'
            key= {item.full_name}
            >
              {item.full_name}
            </div>
          ))}
        </div>
        </div>
      </div>
    );
  };
  
  export default MemberDashboard;