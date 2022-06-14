import * as React from "react";
import { useState, Fragment } from "react";
import "./index.css";
import axios from 'axios';
import Button from "./components/Button";

export default function App() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [activeUser, setActiveUser] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState(0);

  const onClickHandler = ()=>{
    setActiveLink(0);
    setLoading(true);
    axios.get("https://reqres.in/api/users/")
    .then((response)=>{
      console.log(response.data.data);
      setUsers(response.data.data); //----------------
    }).catch((error)=>{
      console.log(error);
      setLoading(true);
    }).finally(()=>{
      setLoading(false);
      setActiveUser(true);
    })

  }


  return (
    <div className="App">
      <h1>Hello users!</h1>
      
      <Button isActive={activeUser} clicked={onClickHandler}/>
      {loading ? (
        <h1>Loading...</h1>
      ):(
        <div className="flex">
        {users.length &&
          users.map((user, index) => {
            return (
              <div key={user.id}>
                <p>
                  <strong>{user.first_name}</strong>
                </p>
                <p>{user.email}</p>
                <img key={user.avatar} src={user.avatar} />
              </div>
            );
          })}
      </div>
      )}
    </div>
  );
}
