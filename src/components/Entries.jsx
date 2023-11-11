import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reducer1, reducer2, reducer3 } from "../mainSlice";

function EntriesComponent() {
  const { entries } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  // function 
  let entriesArray = [];
  for (let i in entries) {

  }

  return (
    <div>
      <button onClick={()=> dispatch(reducer1())}>Generate Entries</button>
    </div>
  )
}

export default EntriesComponent;
