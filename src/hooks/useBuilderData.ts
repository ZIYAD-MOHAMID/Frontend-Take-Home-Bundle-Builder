import { useState, useEffect } from "react";
import type { BuilderData } from "../Types/types";

export function useBuilderData() {
  const [data, setData] = useState<BuilderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/builder-data")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch builder seed data from backend");
        }
        return res.json();
      })
      .then((jsonData: BuilderData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
