import { StartFinish } from "@/components";
import { Navigate, useSearchParams } from "react-router-dom";
const FinishPage = () => {
  const [params] = useSearchParams();

  if (!params.get("prize")) {
    return <Navigate to={"/start"} />;
  }

  return (
    <StartFinish
      titleComponent={
        <>
          <span
            style={{
              fontSize: "32px",
              fontWeight: "600",
              color: "#88888c",
            }}
          >
            Total prize:
          </span>
          <br />${params.get("prize")} earned
        </>
      }
      linkText={"Try Again"}
    />
  );
};

export default FinishPage;
