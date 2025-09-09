import { useState } from "react"
import BaseInput, { InputProps } from "../Input"
import { VisibilityIcon } from "./VisibilityIcon"


export type InputPasswordProps = Omit<InputProps, "type" | "endContent">

const InputPassword = (props: InputPasswordProps) => {
  const [isHidden, setIsHidden] = useState<boolean>(true)

  const getInputType = () => isHidden ? "password" : "text"

  return (
    <BaseInput {...props}
      endContent={<VisibilityIcon setIsHidden={setIsHidden} isHidden={isHidden}/>}
      type={getInputType()}
    />
  )
}

export default InputPassword