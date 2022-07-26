import classNames from "classnames"
import Markdown from "react-markdown"
const Features = ({ data }) => {
  return (
    <section className="bg-[#F4F7F9] py-10">
      <div className=" container md:max-w-screen-md lg:max-w-screen-lg">
        <h1 className="text-center mb-4 font-bold font-xl">{data.title}</h1>
        <ul className="counter md:grid md:grid-cols-3">
          {data.bulletPoints.map((e, i) => (
            <li key={`bullet-point-${i}`} className="py-8 px-4">
              <Markdown className="z-30">{e.text}</Markdown>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Features
