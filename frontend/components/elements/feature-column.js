import classNames from "classnames"
import NextImage from "./image"
import Markdown from "react-markdown"
import CustomLink from "./custom-link"

const FeatureColumn = ({ data, className, showUrlLink }) => {
  const content = (
    <>
      <div className="w-28 h-28 flex-initial">
        <NextImage media={data.icon} className="w-full h-full" />
      </div>
      <h2 className="text-lg font-semibold flex-none">
        {data.title || data.titleFCG}
      </h2>
      <div className="flex-1 mt-1">
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
        <>
          {content}
          <CustomLink
            link={{ url: data.url, text: "更多", id: data.id }}
            className="flex-none text-base mt-2"
          >
            <div className="text-sky-400 ">更多</div>
          </CustomLink>
        </>
      )
    } else {
      return (
        <CustomLink
          link={{ url: data.url, text: "更多", id: data.id }}
          className={classNames("flex flex-col align-center", className, {
            [`md:col-span-${data.span}`]: data.span,
            [`md:col-start-${data.spanstart}`]: data.spanstart,
            [`md:items-${data.selfAlign}`]: data.selfAlign,
          })}
        >
          {" "}
          {content}{" "}
        </CustomLink>
      )
    }
  }
  return (
    <div
      className={classNames("flex flex-col align-center", className, {
        [`md:col-span-${data.span}`]: data.span,
        [`md:col-start-${data.spanstart}`]: data.spanstart,
        [`md:items-${data.selfAlign}`]: data.selfAlign,
      })}
    >
      {content}
    </div>
  )
}
export default FeatureColumn
