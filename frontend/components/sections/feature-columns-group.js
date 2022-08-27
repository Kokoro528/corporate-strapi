import NextImage from "../elements/image"
import Markdown from "react-markdown"
import classNames from "classnames"
import CustomLink from "../elements/custom-link"

const FeatureColumnsGroup = ({ data }) => {
  return (
    <div className="relative"
    // style={{
    //   backgroundImage: data.backgroundImage?.data?.attributes?.url
    //     ? `url("${data.backgroundImage?.data?.attributes?.url}")`
    //     : "blue",
    //   backgroundRepeat: "no-repeat",
    //   backgroundSize: "cover",
    // }}
    >
      <div className="absolute w-full h-full -z-10">
        <NextImage media={data.backgroundImage} layout="fill" className=""></NextImage>
      </div>
      <div className="container py-12 flex flex-col lg:flex-row lg:flex-wrap gap-12 align-top">
        {data.title&&<h1>{data.title}</h1>}
      {data.brief && <Markdown className="prose">{data.brief}</Markdown>}
      <div
        className={classNames(
          {
          "md:grid w-full": data.features.length % 4 === 0 && !data.isFlex,
          "md:grid ": data.features.length % 4 !== 0 && !data.isFlex,
          "md:flex md:flex-nowrap": data.isFlex,
        })}
      >
        {data.features.map((feature, idx) => (
          <div
            className={classNames(
              "flex-1 flex flex-col items-center",
              "justify-between",
              {
                "md:col-start-2":
                  data.features.length % 4 !== 0 && idx % 4 === 3 && !data.isFlex,
                "md:col-span-2":!feature.span,
                
                
              },
              {[`md:col-span-${feature.span}`]: feature.span}
            )}
            key={feature.id}
          >
            <div className="w-28 h-28 relative">
              <NextImage
                media={feature.icon}
                layout="fill"
              />
            </div>
            {feature.titleFCG && <h3 className="font-bold text-lg mt-4 mb-4">
              {feature.title || feature.titleFCG}
            </h3>}
            <Markdown className="text-md text-center px-3 prose flex-1">
              {feature.description}
            </Markdown>
            {feature.url && 
              <CustomLink link={{url: feature.url, text: "更多", id:feature.id}} className="flex-none text-base mt-2">
                 <div className="text-sky-400 " >了解更多</div>
                </CustomLink>
            }
          </div>
        ))}
      </div>
      </div>
      
    </div>
  )
}

export default FeatureColumnsGroup
