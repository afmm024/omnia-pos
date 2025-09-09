import { Eye, EyeClosed } from 'lucide-react'
import React from 'react'

type VisibilityIconProps = {
  setIsHidden: (isHidden: boolean) => void
  isHidden: boolean
}

export const VisibilityIcon: React.FC<VisibilityIconProps> = ({isHidden, setIsHidden}) => {
  return (
    <button type="button" onClick={() => setIsHidden(!isHidden)}>
        {isHidden ? <Eye /> : <EyeClosed /> }
    </button>
  )
}

