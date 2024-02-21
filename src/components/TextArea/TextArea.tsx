import { ChangeEvent } from "react"
import { Input } from 'antd';

const { TextArea: TextAreaAnt } = Input;

type TextAreaProps = {
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const TextArea = (props: TextAreaProps) => {
    return <TextAreaAnt {...props} style={{ resize: 'none' }}/>
}