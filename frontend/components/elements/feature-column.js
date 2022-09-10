import classNames from "classnames"
import NextImage from "./image"
import Markdown from "react-markdown"
import CustomLink from "./custom-link"

const FeatureColumn = ({ data, className, showUrlLink }) => {
  const tmpClass = classNames(
    "flex flex-col align-center w-full",
    "col-span-2",
    className,
    {
      // [`md:col-span-${data.span}`]: data.span,
      // [`md:col-start-${data.spanstart}`]: data.spanstart,
      // [`text-${data.selfAlign}`]: data.selfAlign,
    }
  )
  const content = (
    <>
      <div className={"w-full h-full relative flex-initial basis-24"}>
        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"> */}
        {/* <div className="w-full h-full"> */}
        <NextImage
          media={data.icon}
          quality="100"
          layout="fill"
          className="absolute object-center object-scale-down "
        />
        {/* </div> */}

        {/* </div> */}
      </div>
      <h2 className="text-lg font-semibold ">{data.title || data.titleFCG}</h2>
      <div className="flex-1 mt-1 mx-auto">
        <Markdown className="prose">{data.description}</Markdown>
      </div>
      {/* {data.url && (
                <CustomLink
                 
                >
                  <div className="text-sky-400 ">更多</div>
                </CustomLink>
              )} */}
    </>
  )
  if (data.url) {
    if (data.showUrlLink) {
      return (
        <div className={tmpClass}>
          {content}
          <CustomLink
            link={{ url: data.url, text: "更多", id: data.id }}
            className="flex-none text-base mt-2"
          >
            <div className="text-sky-400 ">更多</div>
          </CustomLink>
        </div>
      )
    } else {
      return (
        <CustomLink
          link={{ url: data.url, text: "更多", id: data.id }}
          className={tmpClass}
        >
          {content}
        </CustomLink>
      )
    }
  }
  return <div className={tmpClass}>{content}</div>
}
export default FeatureColumn
