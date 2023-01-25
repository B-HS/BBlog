import { ChangeEvent, useCallback, useState } from "react";

const useInput = (val = "") => {
    const [value, setValue] = useState<any>(val);
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setValue(e.currentTarget.value), []);
    return [value, onChange, setValue] as const;
};

export default useInput;
