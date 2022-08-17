import Carousel from "react-grid-carousel-w-selectbar"
import classNames from "classnames"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkImages from "remark-images"

const Page = ({ data }) => {
  const MySelectBar = ({ isActive, index }) => {
    return (
      <div
        className={classNames(
          { "border-primary-500": isActive },
          "w-full border-solid hover:border-primary-500 border-t-8 justify-center inline-flex self-start"
        )}
      >
        <span
          className={classNames(
            "writing-vertical-lr sm:writing-lr align-text-top",
            { "text-[#1f62b2]": isActive }
          )}
        >
          {data.contentCards[index].title}
        </span>
      </div>
    )
  }

  return (
    <section
      className=" flex flex-col lg:flex-row  gap-12 align-top py-12 w-full  flex place-content-center"
      style={{
        backgroundImage: data.background?.data?.attributes?.url
          ? `url("${data.background?.data?.attributes?.url}")`
          : "blue",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        className={classNames("container", {
          "bg-blue-300": data?.background?.data?.attribute?.url === null,
        })}
      >
        <Carousel
          hideArrow
          containerClassName={"px-3"}
          showSelectBar
          selectBar={MySelectBar}
          selectBarItemWrapperClassName="self-start leading-10 font-bold text-xl max-w-none w-full flex"
          selectBarClassName="mb-5 py-4 flex items-start"
          mobileBreakpoint={10}
          responsiveLayout={[{ breakpoint: 640, cols: 1 }]}
          autoplay={3000}
          loop
        >
          {data.contentCards.map((e) => (
            <Carousel.Item key={"carousel-item-" + e.id}>
              <div className="md:px-8 carousel">
                {/* <img className="bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full h-[32rem]" /> */}
                {/* <div className="absolute inset-y-1/2 carousel-text"> */}
                {/* {JSON.stringify(e)} */}
                <Markdown
                  className={classNames(" not-prose-headings:text-blue-800 ", {
                    "timeline not-prose": e.type === "timeline",
                    "prose-w-list": e.type === "prose_w_list",
                  })}
                  remarkPlugins={[remarkGfm, remarkImages]}
                >
                  {e.content}
                </Markdown>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  )
}

export default Page
