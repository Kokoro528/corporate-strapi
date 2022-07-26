import { Timeline } from "flowbite-react"
import Carousel from "react-grid-carousel-w-selectbar"
import classNames from "classnames"
import Markdown from "react-markdown"

const Page = ({ data }) => {
  const MySelectBar = ({ isActive, index }) => {
    return (
      <div
        className={classNames(
          { "border-primary-500": isActive },
          "w-full border-solid hover:border-primary-500 border-t-8 justify-center inline-flex"
        )}
      >
        <span className={classNames("", { "text-primary-500": isActive })}>
          {data.timestamps[index].title}
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
        hideArrow={false}
        containerClassName={"w-full px-9"}
        showSelectBar
        selectBar={MySelectBar}
        selectBarItemWrapperClassName="mt-3 leading-10 font-bold text-xl max-w-none w-full "
        selectBarClassName="mb-5 py-4"
        autoplay={3000}
        loop
      >
        {data.timestamps.map((e, i) => (
          <Carousel.Item key={`carousel-item-timeline-${i}`}>
            <div className="relative px-40 carousel">
              {/* <img className="bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full h-[32rem]" /> */}
              {/* <div className="absolute inset-y-1/2 carousel-text"> */}
              <div className="place-center">
                <div className="grid grid-cols-2 gap-x-12 gap-y-8 place-center">
                  {e.subtimestamps.map((sub, isub) => {
                    return (
                      <div
                        key={`subtimeline-${isub}`}
                        className="md:grid md:grid-cols-5 "
                      >
                        <h4 className="md:mr-4 md:col-span-1 md:text-primary-400 md:text-right align-baseline my-3 font-bold text-xl  whitespace-nowrap">
                          {sub.title}
                        </h4>
                        <Markdown className="md:col-span-4 prose prose-strong:text-yellow-400 prose-em:prose-p:my-2 border-l-2 border-solid border-yellow-300 pl-3 ">
                          {sub.description}
                        </Markdown>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
    // <Steps >
    //     {Arrays.of(5).map(e => {
    //         return (<Step className="">

    //         </Step>)
    //     })}
    // </Steps>
    // <ProgressBar percent={75} className="flex h-4">
    //   <Step>
    //     {({ accomplished, index }) => (
    //       <div
    //         className={`indexedStep ${accomplished ? "accomplished" : null}`}
    //       >
    //         {index + 1}
    //       </div>
    //     )}
    //   </Step>
    //   <Step>
    //     {({ accomplished, index }) => (
    //       <div
    //         className={`indexedStep ${accomplished ? "accomplished" : null}`}
    //       >
    //         {index + 1}
    //       </div>
    //     )}
    //   </Step>
    //   <Step>
    //     {({ accomplished, index }) => (
    //       <div
    //         className={`indexedStep ${accomplished ? "accomplished" : null}`}
    //       >
    //         {index + 1}
    //       </div>
    //     )}
    //   </Step>
    // </ProgressBar>
  )
}

export default Page
