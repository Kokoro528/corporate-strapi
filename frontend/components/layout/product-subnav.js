import { func } from "prop-types"
import { object } from "prop-types"
import { useCallback, useEffect, useState, useMemo } from "react"
import { getSingleType } from "utils/api"
import CustomLink from "../elements/custom-link"
import classNames from "classnames"
import NextImage from "../elements/image"

const ProductSubcontainer = (props) => {

  const [data, setData] = useState({})

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await getSingleType({ singularName: "product-subcontainer" })
        console.log()
        setData(res.attributes)


      } catch (err) {
        console.log("err: suanle")
      }
    }
    fetchCollection()
  }, [])

  console.log("data", data)

  const Mworks = cardWrapper(
    () => (<p>
      {data?.Mworks?.description}
    </p>)

  )

  const GetStarted = cardWrapper(
    () => (

      <ul>
        {data?.getStarted?.links.map(link => {
          return (
            <li>
              <CustomLink
                link={link}>
                {link.text}
              </CustomLink>
            </li>
          )

        })}



      </ul>
    )

  )

  const ProductList = cardWrapper(
    () => (
    <div className="grid grid-flow-col grid-cols-3 grid-rows-2">
      {
      data?.products?.map(e => {
        return (
          <div className=" flex flex-col  items-start py-4 px-4 flex-1">
          <CustomLink link={e.link}>
            <>
            <div className="w-20 h-20">
              <NextImage media={e.link.icon} />
            </div>
            <p className="text-sm ">{e.link.title}</p>  
            </>           
          </CustomLink>
        </div>)})
        }
        </div>)
        )
      
        

  return (
    <div
      className="
      mega-menu w-full -mt-3 hidden bg-white absolute left-0 top-full
      "
      aria-labelledby={`subNav`}
    >
      <div className="container z-40">
        <div
          className="grid grid-cols-3 gap-4 p-4"
          id="tabs-tabContentVertical"
        >
          <div className="col-span-1">
            <Mworks {...data.Mworks} />
            <GetStarted {...data.getStarted} />
          </div>
          <div className="col-span-2 "><ProductList {...data.products} /></div>
          {/* {
            data?.map((e) => (
                <li key={`${e.attributes.title}-${pluralName}-${e.id}`}>
                  <CustomLink
                    link={{ url: `${pluralName}/${e.attributes.title}` }}
                  >
                    {e.attributes.title}
                  </CustomLink>
                </li>
              ))} */}
              

        </div>
      </div>
    </div>
  )

}

export default ProductSubcontainer;

const cardWrapper = Component => (prop) => {
  return (<div className="flex flex-col px-2 py-3 divide-y divide-slate-200 ">
    <h1 className="font-bold text-slate-200 ">{prop.title}</h1>
    <div className="my-3">
      <Component />
    </div>

  </div>)

}