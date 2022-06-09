import NextImage from "../elements/image"
import Markdown from "react-markdown"

const FeatureGroup = ({ data }) => {
  return (
    <div className="container  lg:flex-row lg:flex-wrap gap-12 align-top py-12">
      <h1 className="text-center text-[40px] font-bold p-3">{data.title}</h1>
      <h3 className="text-center text-[30px] leading-relaxed font-semibold p-4">
        {data.subtitle}
      </h3>
      <div className="flex flex-col ">
        {data.features.map((feature) => (
          <div
            className="flex flex-col self-stretch justify-center justify-self-center align-self-center w-1/2   text-lg p-3"
            key={feature.id}
          >
            <div className="w-100">
              <NextImage media={feature.media} />
            </div>
            {/* <h3 className="font-bold mt-4 mb-4">{feature.title}</h3> */}
            <div className="my-3 mx-4">
              <Markdown>{feature.description}</Markdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureGroup
