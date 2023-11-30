import { createContext } from 'react'

const LoadingContext = createContext<{ isLoading: boolean; setLoading: Function }>({
    isLoading: false,
    setLoading: () => {},
})

export { LoadingContext }
