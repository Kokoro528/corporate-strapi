import { func } from "prop-types"
import { object } from "prop-types"
import { useCallback, useEffect, useState } from "react"
import { getCollectionList } from "utils/api"
import CustomLink from "../elements/custom-link"
const Subnav = (props) => {
  const { parentId, pluralName, enums, globals} = props
  const [data, setData] = useState([])
  const [selectedSideTab, setSelectedSideTab] = useState(null)
  console.log(enums, "enums")
  console.log(pluralName, "pluralName")

  


  useEffect(() => {
    const fetchCollection = async () => {
      try {
        if (pluralName) {
          const res = await getCollectionList(parentId)
          if (res.data?.length) {
            setData(res.data)
          }
        }
      }
      catch (err) {
        console.log("err: suanle" )
      }

    }
    fetchCollection()
    
  }, [ pluralName])

// const tab = 
// useCallback(() => {

// })

if (enums && parentId && enums[parentId]){
   return (
  <div className="
        mega-menu w-full -mt-1 hidden shadow-lg bg-white absolute left-0 top-full
        " aria-labelledby={`subNav${parentId}`} >
    <div className="container z-40">
      <div className="row my-4">
        <div class="col-md-6 col-xl-3 mb-3 mb-xl-0">
          <div className="pt-2">

            <div class="flex items-start">
              <ul class="nav nav-tabs flex flex-col flex-wrap list-none border-b-0 pl-0 mr-4" id="tabs-tabVertical"
                role="tablist border-r-1">
                {
                Object.keys(enums[parentId]).map(category => (
                  <li class="nav-item flex-grow text-center" role="presentation" onMouseOver={
                    (e) => {
                      // e.preventDefault();
                      setSelectedSideTab(category)
                    }
                  }>
                    <a href={`${pluralName}?type=${category}`} className="
          
          block
          font-medium
          text-sm
          leading-tight
          uppercase
          border-transparent
          px-6
          py-3
          my-2
          hover:border-transparent hover:bg-gray-100
          focus:border-transparent
          active
        " 
        key={`tab${parentId}-${category}`}
        id={`tabs-${category}-tabVertical`} 
        // data-bs-toggle="pill" data-bs-target={`#tabs-${category}Vertical`} 
        role="tab"
                      aria-controls={`tabs-${category}Vertical`} >
                        {/* {JSON.stringify(enums)} */}
                      {enums[parentId][category]}
                    </a>
                  </li>))}

              </ul>
              
            </div>
          </div>
          {/* <div class="pt-2">
                    <p class="text-uppercase font-weight-bold">
                      Explicabo voluptas
                    </p>
                    <a href="" class="text-dark">
                      <div class="row mb-4 border-bottom pb-2">
                        <div class="col-3">
                          <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
                            class="img-fluid shadow-1-strong rounded" alt="Hollywood Sign on The Hill" />
                        </div>
                        <div class="col-9">
                          <p class="mb-2">
                            <strong>Lorem ipsum dolor sit
                              amet</strong>
                          </p>
                          <p><u>15.07.2020</u></p>
                        </div>
                      </div>
                    </a>
                    <a href="" class="text-dark">
                      <div class="row mb-4 border-bottom pb-2">
                        <div class="col-3">
                          <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp"
                            class="img-fluid shadow-1-strong rounded" alt="Palm Springs" />
                        </div>
                        <div class="col-9">
                          <p class="mb-2">
                            <strong>Lorem ipsum dolor sit
                              amet</strong>
                          </p>
                          <p><u>15.07.2020</u></p>
                        </div>
                      </div>
                    </a>
                    <a href="" class="text-dark">
                      <div class="row mb-4 border-bottom pb-2">
                        <div class="col-3">
                          <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp"
                            class="img-fluid shadow-1-strong rounded" alt="Los Angeles Skyscrapers" />
                        </div>
                        <div class="col-9">
                          <p class="mb-2">
                            <strong>Lorem ipsum dolor sit
                              amet</strong>
                          </p>
                          <p><u>15.07.2020</u></p>
                        </div>
                      </div>
                    </a>
                    <a href="" class="text-dark">
                      <div class="row mb-4 border-bottom pb-2">
                        <div class="col-3">
                          <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp"
                            class="img-fluid shadow-1-strong rounded" alt="Skyscrapers" />
                        </div>
                        <div class="col-9">
                          <p class="mb-2">
                            <strong>Lorem ipsum dolor sit
                              amet</strong>
                          </p>
                          <p><u>15.07.2020</u></p>
                        </div>
                      </div>
                    </a>
                  </div> */}
        </div>
        <div className="col grid grid-cols-2 gap-4 p-4" id="tabs-tabContentVertical">
                {selectedSideTab && selectedSideTab.length && data.filter(e => e.attributes.category === selectedSideTab).map(e => (
                        <li>
                          <CustomLink link={{url:`${pluralName}/${e.attributes.title}`}}>
                            {e.attributes.title}
                          </CustomLink>
                          
                        </li>
                )) }
                {/* {Object.keys(enums[pluralName]).map(category => {
                  return (
                    <div key={`tabpanel${parentId}-${category}`} className={"tab-pane fade show " + selectedSideTab === category?"active": ""} id={`tabs-${category}Vertical`} role="tabpanel"
                      aria-labelledby={`tabs-${category}-tabVertical`}>
                      {data.map(e => {
                        <li>
                          {e.attributes.title}
                        </li>
                      })}
                    </div>
                  )
                })} */}


              </div>
      </div>
    </div>
  </div>
)
}
 
else return null;
}

export default Subnav