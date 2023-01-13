import { useState, useCallback, ChangeEvent } from "react";

const useInput = (val = "") => {
    const [value, setValue] = useState(val);
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setValue(e.currentTarget.value), []);
    return [value, onChange, setValue] as const;
};

export default useInput;
