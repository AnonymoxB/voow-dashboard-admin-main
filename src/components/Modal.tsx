import React, { ReactNode } from "react";

interface ModalProps {
    id? : string,
    title?:string
    children : ReactNode
}

export default function Modal({id = "modalExampleId",title="Modal Example",children} : ModalProps ) {
  return (
    <dialog
      id={id}
      className="modal modal-center"
    >
      <div className="modal-box w-full max-w-5xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-3">{title} </h3>

        {children}
      </div>
    </dialog>
  );
}
