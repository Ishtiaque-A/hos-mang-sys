import { useContext } from "react";
import { QueryContext } from "../context/Query-conext";

const useRouterQuery = () => {
  const context = useContext(QueryContext);
  if (context === undefined) {
    throw new Error("useQuery must be used within a QueryProvider");
  }
  return context;
};

export default useRouterQuery;
