import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [tempMin, setTempMin] = useState(searchParams.get("minPrice") || "");
  const [tempMax, setTempMax] = useState(searchParams.get("maxPrice") || "");
  const [tempGenre, setTempGenre] = useState(
    searchParams.get("genre") || "all",
  );
  const [tempPlatform, setTempPlatform] = useState(
    searchParams.get("platform") || "all",
  );

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    if (tempMin) {
      params.set("minPrice", tempMin);
    } else {
      params.delete("minPrice");
    }
    if (tempMax) {
      params.set("maxPrice", tempMax);
    } else {
      params.delete("maxPrice");
    }

    params.set("genre", tempGenre);
    params.set("platform", tempPlatform);

    params.set("page", "1");

    setSearchParams(params);
  }, [
    tempMin,
    tempMax,
    tempGenre,
    tempPlatform,
    searchParams,
    setSearchParams,
  ]);

  const setPage = useCallback(
    (p) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", p);
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const setSort = useCallback(
    (v) => {
      const params = new URLSearchParams(searchParams);
      params.set("sortBy", v);
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const clearPrice = useCallback(() => {
    setTempMin("");
    setTempMax("");
  }, []);

  return {
    filters: {
      tempMin,
      tempMax,
      tempGenre,
      tempPlatform,
    },

    setters: {
      setPage,
      setSort,
      setTempMin,
      setTempMax,
      setTempGenre,
      setTempPlatform,
    },
    applyFilters,
    clearPrice,
  };
};
