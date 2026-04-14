import { useEffect } from "react";
import ReactPortal from "./ReactPortal";

function Modal({ children, title, isOpen, handleClose }) {
  // close modal on escape key press
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  //disable scroll on modal load
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="modal-container">
      <>
        <div className="fixed inset-0 w-screen h-screen z-40 bg-black/60 backdrop-blur-sm" />
        <div className="fixed inset-0 w-full h-full flex justify-center items-center box-border min-w-fit overflow-hidden  text-white z-50">
          <div className="rounded-2xl flex flex-col justify-center w-fit m-5 p-5 border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="flex justify-between relative w-full">
              <h2 className="font-jura font-bold text-xl capitalize">
                {title}
              </h2>
              <button
                onClick={handleClose}
                className="ml-auto p-1 rounded-full transition-colors hover:bg-white/10"
                aria-label="close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="h-5/6 box-border">{children}</div>
          </div>
        </div>
      </>
    </ReactPortal>
  );
}

export default Modal;
