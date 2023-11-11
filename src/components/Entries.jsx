import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reducer1, reducer2, reducer3 } from "../mainSlice";

function EntriesComponent() {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.entries);

  return <></>;
}

export default EntriesComponent;
