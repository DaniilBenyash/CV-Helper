import { ChangeEvent, useState } from "react"
import { TextArea } from "../TextArea"

export const FormTextArea = () => {
    const [state, setState] = useState<string>('')

    const handleChange = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = ev.target.value
        setState(value)
    }
    return (<TextArea onChange={handleChange}/>)
}