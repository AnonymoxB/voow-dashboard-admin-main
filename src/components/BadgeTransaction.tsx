import React, { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  status?: "Pending" | "Success" | "Failed" | undefined;
}

export default function BadgeTransaction({ children, status }: BadgeProps) {
  let bg = "";
  switch (status) {
    case "Pending":
      bg = "badge-warning";
      break;
    case "Success":
      bg = "badge-primary";
      break;
    case "Failed":
      bg = "badge-warning";
      break;
    case undefined:
      bg = "badge-warning";
      break;
  }
  return <div className={`badge ${bg}`}>{children}</div>;
}
