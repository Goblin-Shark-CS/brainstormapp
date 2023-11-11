import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reducer1, reducer2, reducer3 } from "../mainSlice";

function EntriesComponent() {
  const { entries } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  // TODO: Create components for all entires in state
  let entriesArray = [];
  for (let i in entries) {
   // for each item in entries, render a  
  }

  

  return (
    <div>
      {/*TODO: Add array to render all messages */}
      <button onClick={()=> dispatch(reducer1())}>Generate Entries</button>
    </div>
  )
}

export default EntriesComponent;
