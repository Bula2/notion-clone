import { useEffect, useRef, useState } from "react"

export const useOverflowsScreenBottom = () => {
    const [overflows, setOverflows] = useState(false)
    const ref = useRef<HTMLDivElement>(null) 

    useEffect(() => {
        if (ref.current) {
            const {bottom} = ref.current.getBoundingClientRect()
            const {innerHeight} = window
            setOverflows(bottom > innerHeight)
        }
    }, [])

    return {overflows, ref}
}