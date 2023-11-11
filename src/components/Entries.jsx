import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reducer1, reducer2, reducer3 } from "../mainSlice";
import Entry from './Entry.jsx';


// Entries Container
function EntriesComponent(props) {
  const { entries } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  let entriesArray = [];
  // for each item in entries, render an Entry component
  for (let i in entries) {
    // Creates components for all entires in state
    entriesArray.push(
      <Entry 
        votesCount = {entries[i].votesCount}
        userVoteStatus = {entries[i].userVoteStatus}
        messageContent = {entries[i].message}
      />
    )
  }

  return (
    <div>
      {entriesArray}
    </div>
  )
}

export default EntriesComponent;
