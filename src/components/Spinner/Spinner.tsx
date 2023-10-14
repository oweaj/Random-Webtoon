import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  borderColor: "#ffffff",
};

const Spinner = () => {
  return (
    <div className={`w-full flex items-center justify-center`}>
      <ClipLoader color="#0000" cssOverride={override} size={80} aria-label="Loading Spinner" data-testid="loader" />
    </div>
  );
};

export default Spinner;
