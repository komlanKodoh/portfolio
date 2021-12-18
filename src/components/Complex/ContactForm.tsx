import React, { useState } from "react"
import NormalInput from "../Inputs/NormalInput"
import TextArea from "../Inputs/TextArea"

const ContactForm = () => {
  const [inputValue, setInputValue] = useState<{ [key: string]: any }>({})
  return (
    <div className="flex flex-col gap-4">
      <NormalInput
        name={"Name"}
        label={"Name"}
        placeholder={"Your Name"}
        id={"form_contact_field"}
        required={true}
        state={[inputValue, setInputValue]}
        className={"w-full border-2 border-slate-900 p-1"}
      />
      <NormalInput
        name={"contact"}
        label={"Contact"}
        placeholder={"Email or phone Number"}
        id={"form_contact_field"}
        required={true}
        state={[inputValue, setInputValue]}
        className={"w-full border-2 border-slate-900 p-1"}
      />
      <TextArea
        name={"message"}
        label={"Message"}
        placeholder={"Write your message"}
        id={"form_message_field"}
        required={true}
        state={[inputValue, setInputValue]}
        className={"w-full border-2 border-slate-900 min-h-[250px] p-1"}
      />
    </div>
  )
}

export default ContactForm
