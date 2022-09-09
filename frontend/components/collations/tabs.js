import classNames from "classnames"
import { useState } from "react"

const Tabs = ({ tabList }) => {
  const [tab, selectTab] = useState(tabList[0] ? tabList[0].productId : "")

  return (
    <div className="container mx-auto mb-4  border-gray-200 dark:border-gray-700">
      <ul
        className="flex md:flex-wrap justify-center -mb-px mt-3 text-sm font-medium text-center"
        id="myTab"
        data-tabs-toggle="#myTabContent"
        role="tablist"
      >
        {tabList.map((e) => (
          <li key={`tab-${Math.random()}`} className="mr-2" role="presentation">
            <button
              className="inline-flex mx-auto grow-1 px-2 py-3 rounded-lg border-2"
              id={e.productId + "-tab"}
              data-tabs-target={"#" + e.productId}
              type="button"
              role="tab"
              aria-controls={e.productId}
              onClick={() => selectTab(e.productId)}
              aria-selected="false"
            >
              {<span className=" w-full">{e.title} </span>}
            </button>
          </li>
        ))}
      </ul>
      <div id="myTabContent" className="my-12">
        {tabList.map((e) => {
          const Component = e.component
          return (
            <div
              id={e.productId}
              key={`tabcontent-${Math.random()}`}
              role="tabpanel"
              aria-labelledby={`${e.productId}-tab`}
              className={classNames("fade", {
                "show active": tab === e.productId,
              })}
            >
              <Component />{" "}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Tabs
