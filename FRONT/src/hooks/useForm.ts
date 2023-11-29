import { useState } from 'react'

const useForm = <T>(inputs: T) => {
    const [formData, setFormData] = useState<T>(inputs)

    const onChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    return { formData, onChangeFormData, setFormData }
}

export default useForm
