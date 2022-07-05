import ErrorPage from "next/error"
import {
  getCaseData,
  getCollectionList,
  fetchAPI,
  getGlobalData,
  getPageData,
} from "utils/api"
import Sections from "@/components/sections"
import Seo from "@/components/elements/seo"
import Header from "@/components/elements/header"
import { useRouter } from "next/router"
import Layout from "@/components/layout"
import { getLocalizedPaths } from "utils/localize"
import Link from "next/link"
import NextImage from "@/components/elements/image"
import FilterTabs from "@/components/filter-tabs"
import { unstable_getServerSession } from "next-auth"
import { options } from "pages/api/auth/[...nextauth]"
import fetcher from "utils/fetcher"
import useSWR, { SWRConfig } from "swr"
import { useState, useEffect } from "react"
import TopHeading from "@/components/sections/top-heading"

const SoftwareList = ({ data, page, router }) => {
  // const getDefaultSrc = (attr) => {
  //   let res = {}
  //   attr.
  // }

  return (
    <div className="container flex flex-col  ">
      {data?.map(({ id, attributes }) => (
        // <Link href={`${router.pathname}/${attributes.title}`} key={"case-" + id} passHref>
        <div className="flex flex-1 text-lg" key={id}>
          <div>
            <NextImage className="hover:opacity-40" />
          </div>
          <div className="">
            <h3 className="font-bold mt-4 mb-4">
              {attributes.product}
              <span className="text-primary-700 border-dotted border-indigo-800 border-l-3">
                {attributes.version}
              </span>
            </h3>
            <p>{attributes.snapshot}</p>
          </div>
        </div>
        // </Link>
      ))}
    </div>
  )
}

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const DynamicPage = ({
  // data,
  page,
  metadata,
  preview,
  global,
  pageContext,
  title,
}) => {
  const router = useRouter()

  // const { data, error } = useSWR(`/api/collection`)
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/collection" + "/softwares")
      const json = await res.json()
      if (json.data) {
        setData(json.data)
      }
    }
    fetchData()
  }, [])
  //   if (!router.asPath.includes("cases") && !router.asPath.includes("libraries") && !router.asPath.includes("solutions"))
  //   return null

  // Check if the required data was provided
  // if ( !data || !data.length) {
  //   return <ErrorPage statusCode={404} />
  // }
  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">Loading...</div>
  }

  // Merge default site SEO settings with page specific SEO settings
  //   if (metadata.shareImage?.data == null) {
  //     delete metadata.shareImage
  //   }
  const metadataWithDefaults = {
    ...global.attributes.metadata,
    ...metadata,
  }

  const category = router.query.category

  return (
    // <SWRConfig value= {{}}>
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      {/* <Seo metadata={metadataWithDefaults} /> */}
      {/* Display content sections */}
      {/* <Header title={title} ></Header> */}
      {/* <Sections sections={sections} preview={preview} /> */}

      <FilterTabs
        enumColumn={""}
        menubar={global?.attributes?.navbar.links.find((e) =>
          e.url.includes("support")
        )}
      >
        <SoftwareList
          //   data={data?.filter((e) =>
          //     category ? e.attributes.product === category : true
          //   )}
          data={data}
          page={page}
          router={router}
        ></SoftwareList>
      </FilterTabs>
    </Layout>
    // </SWRConfig>
  )
}

export async function getServerSideProps(context) {
  const {
    params,
    query,
    locale,
    locales,
    defaultLocale,
    preview = null,
  } = context
  const globalLocale = await getGlobalData(locale)
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    options
  )

  // Fetch pages. Include drafts if preview mode is on
  // const pageData = await getCaseData({
  //   category: query?.type,
  //   locale,
  //   preview,

  // })

  const PageData = await getPageData(
    {
      slug: "cases",
      locale,
      preview,
    },
    session
  )

  // const pageData = await getCollectionList("cases", session)
  // console.log('pageDAta', pageData)

  // if (pageData == null) {
  //   // Giving the page no props will trigger a 404 page
  //   return { props: {} }
  // }

  // We have the required page data, pass it to the page component

  const pageContext = {
    locale,
    locales,
    defaultLocale,

    // localizations,
  }

  const localizedPaths = getLocalizedPaths(pageContext)

  return {
    props: {
      preview,
      //   sections: contentSections,
      // data: pageData.data,
      page: PageData,
      //   title,
      //   metadata,
      global: globalLocale,
      pageContext: {
        ...pageContext,
        localizedPaths,
      },
    },
  }
}

export default DynamicPage
