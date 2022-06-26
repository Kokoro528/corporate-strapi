import NextImage from "../elements/image"
import Markdown from "react-markdown"

const FeatureColumnsGroup = ({ data }) => {
  return (
    <div className="container flex flex-col lg:flex-row lg:flex-wrap gap-12 align-top py-12">
      <h1>{data.title}</h1>
      {data.features.map((feature) => (
        <div className="flex-1 flex flex-col items-center" key={feature.id}>
          <div className="w-20 h-20">
            <NextImage media={feature.icon} />
          </div>
          <h3 className="font-bold mt-4 mb-4">{feature.title}</h3>
          <Markdown className="text-md text-center">
            {feature.description}
          </Markdown>
        </div>
      ))}
    </div>
  )
}

export default FeatureColumnsGroup
