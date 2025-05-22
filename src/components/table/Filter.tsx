import React from "react";
import { Column, Table as ReactTable } from "@tanstack/react-table";

interface FilterProps {
  column : Column<any, any>,
  table : ReactTable<any>,
  lenght:number
}

export default function Filter({column,table,lenght}: FilterProps) 
{
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();
  const lenghtInput = lenght;

  var widhtInput = "w-0";

  if(lenghtInput > 5){
     widhtInput = "w-24";
  }else{
    widhtInput = "w-36";
  }

  return typeof firstValue === "number" ? (
    ""
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className={`input input-bordered ${widhtInput} h-8 mt-2`}
    />
  );
}
