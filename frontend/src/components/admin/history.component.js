import React, { useRef, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "./History.css";

export default function History() {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [all,setAll] = useState(true);
  const [select,setSelect] = useState(true);
  const stageRef = useRef(null);
  const width = 500;
  const height = 500;
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);


  const Checkbox = ({ id, type, name, handleClick, isChecked }) => {
    return (
      <input
        id={id}
        name={name}
        type={type}
        onChange={handleClick}
        checked={isChecked}
      />
    );
  };
  

  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map(li => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };


  

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/history").then(
          res => res.json()
        );
        setHistory(response);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchHistory();
  }, []);

  const handleChange=(data)=>{
    if(data=="all")
    {
        if(all == true)
        {
          console.log(data, "All Selected");
        }
    }
    if(data=="select")
    {
        if(select == true)
        {
          console.log(data, "Image Selected");
        }
    }
}
  if (loading) return <h1>loading..</h1>;
  if (error) return <h1>{error}</h1>;
  if (!history) return null;

  return (
    <div>
      <ul>
        {history.map(val => (
          <li key={val.image}>
            <img src={val.image} height="310" width="310" />
            <div style={{fontSize: 20, fontWeight: "bold", fontFamily: "calibri"}}>
               {val.caption}
               <Checkbox
               type="checkbox"
               id="selectAll"
               name="selectAll"
               handleClick={handleSelectAll}
               isChecked={isCheckAll} />                                   
            </div>
          </li>
        ))}
      </ul>
      <ButtonGroup>
          <Button>Manipulate</Button>
          <Button>View</Button>
          <Button>Delete</Button>
      </ButtonGroup>
      <div>
      <Checkbox
        type="checkbox"
        id="selectAll"
        name="selectAll"
        handleClick={handleSelectAll}
        isChecked={isCheckAll} />Select All 
      </div>
      
    </div>
  );

  
}
