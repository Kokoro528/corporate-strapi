import Context from "./context"
import {useRouter} from "next/router"

const FilterTabs = ({ getFilteredContents, children, enumColumn }) => {
    const router = useRouter()
    return <Context.Consumer>
        {({ global, pageContext }) => {
            const enums = global.attributes.enums[enumColumn]
            console.log("enums", Object.keys(enums))
            console.log("pageContext", pageContext)
            return (<div className="container">
                <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tabFill"
                    role="tablist">
                    {Object.keys(enums).map(e => (
                        <li className="nav-item flex-auto text-center" role="presentation" key={e}>
                            <button type="button" onClick={() => {
                                router.push({query: {type: e}})
                            }} class="nav-link
      w-full
      block
      font-large
      text-md
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
      active
    " id={"tabs-" + e} data-bs-toggle="pill" data-bs-target={"#tabs-" + e} role="tab"
                                aria-controls={"tabs-" + e} aria-selected="true">
                                {enums[e]}
                            </button>
                        </li>
                    ))}

                </ul>

                <div className="tab-content" id={"tabs-tabContent"}>
                    {/* {Object.keys(enums).map(e => { return */}
                        <div className="tab-pane fade show active" id={"tabs-" + ''} role="tabpanel" aria-labelledby={"tabs-" + 'e'}>
                            {children}
                        </div>
                    {/* })} */}

                </div>
            </div>)
        }}
    </Context.Consumer>


}

export default FilterTabs;