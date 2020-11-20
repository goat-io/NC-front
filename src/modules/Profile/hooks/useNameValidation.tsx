import { useEffect, useState } from "react";

export const useNameValidation = (name: string | undefined) => {
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!name || name === "") {
      setError("Name is required");
      return;
    }
    setError(undefined);
  }, [name]);

  return { error };
};
