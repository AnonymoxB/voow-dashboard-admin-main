import React, { ReactNode } from "react";

interface CardProps {
  title: string;
  subtitle: any;
  button?: boolean;
  icon?:ReactNode;
}

export default function card({ title, subtitle,icon, button }: CardProps) {
  return (
    <div className="card w-50 bg-base-100 shadow-lg">
      <div className="card-body">
        {icon}

        <h2 className="card-title">{subtitle}</h2>
        <p>{title}</p>
        {/* <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div> */}
      </div>
    </div>
  );
}
