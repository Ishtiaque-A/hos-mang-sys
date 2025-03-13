
import {
    Chip,
      FormControl,
      Input,
      makeStyles,
  } from "@material-ui/core";
  import React, { useEffect, useState } from "react";
  import "./styles.css";
  
  
  export default function Check() {
      const classes = useStyles();
      const [values, setValues] = useState(["test"]);
      const [currValue, setCurrValue] = useState("");
  
      const handleKeyUp = (e) => {
          console.log(e.keyCode);
          if (e.keyCode == 32) {
              setValues((oldState) => [...oldState, e.target.value]);
              setCurrValue("");
          }
      };
  
      useEffect(() => {
          console.log(values);
      }, [values]);
  
      const handleChange = (e) => {
          setCurrValue(e.target.value);
    };
    
    const handleDelete = ( item, index) =>{
      let arr = [...values]
      arr.splice(index,1)
      console.log(item)
      setValues(arr)
    }
  
      return (
          <div className="App">
              <h1>Hello CodeSandbox</h1>
              <h2>Start editing to see some magic happen!</h2>
              <FormControl classes={{ root: classes.formControlRoot }}>
                  <div className={"container"}>
                      {values.map((item,index) => (
                          <Chip  size="small" onDelete={()=>handleDelete(item,index)} label={item}/>
                      ))}
                  </div>
                  <Input
                      value={currValue}
                      onChange={handleChange}
                      onKeyDown={handleKeyUp}
                  />
              </FormControl>
          </div>
      );
  }
  
  const useStyles = makeStyles((theme) => ({
      formControlRoot: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "300px",
          flexWrap: "wrap",
      flexDirection: "row",
      border:'2px solid lightgray',
      padding:4,
      borderRadius:'4px',
          "&> div.container": {
              gap: "6px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap"
          },
          "& > div.container > span": {
              backgroundColor: "gray",
              padding: "1px 3px",
              borderRadius: "4px"
          }
      }
  }));
  