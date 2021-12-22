import React, { useState } from "react"
import Button from "../Basic/Button"
import NormalInput from "../Inputs/NormalInput"
import TextArea from "../Inputs/TextArea"

const ContactForm = () => {
  const [inputValue, setInputValue] = useState<{ [key: string]: any }>({})


  return (
    <form className="flex flex-col gap-4" action="https://formsubmit.co/kodohdaniel@gmail.com" method="POST" >
      <NormalInput
        name={"name"}
        label={"Name"}
        placeholder={"Your Name"}
        id={"form_contact_field"}
        required={true}
        state={[inputValue, setInputValue]}
        className={"w-full border-2 border-slate-900 p-1"}
      />
      <NormalInput
        name={"email"}
        label={"Contact"}
        type="email"
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
      <Button className={" bg-blue-600 border-none text-white py-2"} type="submit">Submit Form</Button>
    </form>
  )
}

export default ContactForm
