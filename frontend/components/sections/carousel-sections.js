import { Timeline } from "flowbite-react"
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
          "w-full border-solid hover:border-primary-500 border-t-8 justify-center inline-flex"
        )}
      >
        <span className={classNames("", { "text-[#1f62b2]": isActive })}>
          {data.contentCards[index].title}
        </span>
      </div>
    )
  }

  return (
    // <>
    //   <ol className="flex flex-col md:flex-row w-full md:justify-stretch">
    //     {data.timestamps.map(e => {
    //     return <li className="mt-3 w-full border-t-4 border-solid hover:border-primary-500 inline-flex justify-center">
    //       <span className="">{e.title}</span>
    //     </li>
    //   })}
    //   </ol>

    // </div>

    <div className="container flex flex-col lg:flex-row  gap-12 align-top py-12 w-full  flex place-content-center">
      <Carousel
        hideArrow
        containerClassName={"w-full px-9"}
        showSelectBar
        selectBar={MySelectBar}
        selectBarItemWrapperClassName="mt-3 leading-10 font-bold text-xl max-w-none w-full "
        selectBarClassName="mb-5 py-4"
        autoplay={3000}
        loop
      >
        {data.contentCards.map((e) => (
          <Carousel.Item key={"carousel-item-" + e.id}>
            <div className="relative px-40 carousel">
              {/* <img className="bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full h-[32rem]" /> */}
              {/* <div className="absolute inset-y-1/2 carousel-text"> */}
              <Markdown
                className="prose prose-ol:counter prose-ol:grid lg:prose-ol:grid-cols-2 prose-headings:bg-sky-100 prose-headings:py-3 lg:prose-xl"
                remarkPlugins={[remarkGfm, remarkImages]}
              >
                {e.content}
              </Markdown>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default Page
