import NextImage from "../elements/image"
import Markdown from "react-markdown"
import classNames from "classnames"

const FeatureColumnsGroup = ({ data }) => {
  return (
    <div className="container flex flex-col lg:flex-row lg:flex-wrap gap-12 align-top py-12">
      <h1>{data.title}</h1>
      <div
        className={classNames("grid", {
          "md:grid-cols-8 w-full": data.features.length % 4 === 0,
          "md:grid-cols-6": data.features.length % 4 !== 0,
        })}
      >
        {data.features.map((feature, idx) => (
          <div
            className={classNames(
              "md:col-span-2 flex-1 flex flex-col items-center",
              {
                "md:col-start-2":
                  data.features.length % 4 !== 0 && idx % 4 === 3,
              }
            )}
            key={feature.id}
          >
            <div className="w-20 h-20 relative">
              <NextImage
                media={feature.icon}
                width="1"
                height="1"
                layout="fill"
              />
            </div>
            <h3 className="font-bold text-lg mt-4 mb-4">
              {feature.title || feature.titleFCG}
            </h3>
            <Markdown className="text-md text-center px-3 prose ">
              {feature.description}
            </Markdown>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureColumnsGroup
