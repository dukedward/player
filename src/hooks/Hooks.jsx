import { useState, useEffect, useRef } from "react"

export const useHover = () => {
    const [value, setValue] = useState(false)
    const curRef = useRef(null)
    const handleMouseOver = () => setValue(true)
    const handleMouseOut = () => setValue(false)
    useEffect(() => {
      const node = curRef.current
      if (node) {
        node.addEventListener('mouseover', handleMouseOver)
        node.addEventListener('mouseout', handleMouseOut)
        return () => {
          node.addEventListener('mouseover', handleMouseOver)
          node.addEventListener('mouseout', handleMouseOut)
        }
      }
    },[])
    return [curRef, value]
  }