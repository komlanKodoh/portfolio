import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout, { useNavContext } from "../components/Layout"

const Page = () => {
  const { theme, setTheme } = useNavContext()
  const [observer, setObserver] = useState()
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>{
        console.log("dd")
        entries.forEach(entry => {
          
          if (entry.isIntersecting) {
            console.log("All ",entries.map(entry => entry.target.dataset.theme))
            console.log("Intersecting ",entries.filter(entry => entry.isIntersecting).map(entry => entry.target.dataset.theme) )
            setTheme(entry.target.dataset.theme)
  
          }
        })},
      {
        root: document.querySelector('#gatsby-focus-wrapper'),
        rootMargin: "0% 0%  -99% 0%",
  
      }
    )
    setObserver(observer)
  }, [])

  return (
    <>
      <Section observer={observer} className=" bg-slate-900" theme="dark" />
      <Section observer={observer} className=" bg-white" theme="white" />
      <Section observer={observer} className=" bg-blue-800" theme="blue" />
    </>
  )
}

const Section = ({ observer, className, theme }) => {
  const sectionRef = React.useRef()
  useEffect(() => {
    observer?.observe(sectionRef.current)
  }, [])
  return (
    <div
      ref={sectionRef}
      data-theme={theme}
      className={`${className} w-full h-screen max-h-[1250px]`}
    ></div>
  )
}


 const IndexPage= ()  => {

  return <Layout>
    <Page />
  </Layout>
 }


export default IndexPage;