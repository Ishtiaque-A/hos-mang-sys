import { createContext } from "react";
import { useSearchParams } from "react-router-dom";

const QueryContext = createContext(undefined);

const QueryProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function setQuery(key, value) {
    if (typeof key === "string") {
      searchParams.set(key, String(value));
      setSearchParams(searchParams);
    } else {
      setSearchParams(key);
    }
  }

  function removeQuery(key) {
    searchParams.delete(key);
    setSearchParams(searchParams);
  }

  function resetQuery() {
    setSearchParams({});
  }

  function refreshQuery() {
    setSearchParams(searchParams);
  }

  return (
    <QueryContext.Provider
      value={{
        query: searchParams,
        setQuery,
        removeQuery,
        resetQuery,
        refreshQuery,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export { QueryContext, QueryProvider };
