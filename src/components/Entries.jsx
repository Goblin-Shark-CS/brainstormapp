import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialState, addEntry, toggleVote } from "../mainSlice";
import Entry from "./Entry.jsx";
import Box from "@mui/material/Box";

export default function Entries(props) {
  const { entries } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const entriesBundle = [...entries]
    .sort((a, b) => b.voteCount - a.voteCount)
    .map(({ id, voteCount, userVote, text }) => (
      <Entry
        key={id}
        entry={id}
        voteCount={voteCount}
        userVote={userVote}
        entryContent={text}
      />
    ));

  return <>{entriesBundle}</>;
}
