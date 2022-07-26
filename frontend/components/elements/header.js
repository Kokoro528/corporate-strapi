import Markdown from "react-markdown"
import classNames from "classnames"

const Header = ({ title }) => {
  return (
    <div
      className={classNames(
        // Common classes
        "text-white text-2xl px-2 py-3",
        "sticky top-20",
        {
          // Apply theme based on notification type
          //   "bg-blue-600": type === "info",
          //   "bg-orange-600": type === "warning",
          //   "bg-red-600": type === "alert",
          "bg-primary-800": true,
        }
      )}
    >
      <div className="container flex flex-row justify-between items-center ">
        {/* <div className="rich-text-banner flex-1"> */}
        {title}
        {/* </div> */}
        {/* <button onClick={closeSelf} className="px-1 py-1 flex-shrink-0">
          <MdClose className="h-6 w-auto" color="#fff" />
        </button> */}
      </div>
    </div>
  )
}

export default Header
