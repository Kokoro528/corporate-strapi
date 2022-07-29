import NextImage from "../elements/image"
import Markdown from "react-markdown"

const FeatureGroup = ({ data }) => {
  return (
    <div className="container  lg:flex-row lg:flex-wrap gap-12 align-top py-12">
      <h1 className="text-center text-[40px] font-bold p-3">{data.title}</h1>
      <h3 className="text-center text-[30px] leading-relaxed font-semibold p-4">
        {data.subtitle}
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 auto-rows-max ">
        {data.features?.map((feature) => (
          <div className="prose  py-12 flex flex-col " key={feature.id}>
            <div className="flex-shrink-0 w-full mt-6 md:mt-0 aspect-video -z-10 relative">
              <NextImage
                media={feature.media}
                width="16"
                height="9"
                layout="fill"
                className="object-scale-down aspect-video"
              />
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
