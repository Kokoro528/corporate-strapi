import ErrorPage from "next/error"
import { fetchAPI, getGlobalData, getSingleDoc } from "utils/api"
import Sections from "@/components/sections"
import Seo from "@/components/elements/seo"
import Header from "@/components/elements/header"
import { useRouter } from "next/router"
import Layout from "@/components/layout"
import { getLocalizedPaths } from "utils/localize"
import Products from "@/components/global/products"

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const DynamicPage = ({
  sections,
  metadata,
  preview,
  global,
  pageContext,
  title,
}) => {
  const router = useRouter()

  // Check if the required data was provided
  // if (!router.isFallback && !sections?.length) {
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

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      {/* <Seo metadata={metadataWithDefaults} /> */}
      {/* Display content sections */}
      <Header title={title}></Header>
      <Sections sections={sections} preview={preview} />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const {
    params,
    locale,
    locales,
    defaultLocale,
    preview = null,
    resolvedUrl,
  } = context

  const globalLocale = await getGlobalData(locale)
  // Fetch pages. Include drafts ifgetCase preview mode is on
  const pageData = await getSingleDoc({
    // slug: (!params.slug ? [""] : params.slug).join("/"),
    title: params.title ? params.title : null,
    pluralName: "cases",
    locale,
    preview,
  })
  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} }
  }
  console.log("pageData", pageData)

  // We have the required page data, pass it to the page component
  const {
    contentSections,
    // metadata,
    localizations,
    title,
  } = pageData[0]?.attributes

  const pageContext = {
    locale,
    locales,
    defaultLocale,
    // slug,
    localizations,
  }

  const localizedPaths = getLocalizedPaths(pageContext)

  return {
    props: {
      preview,
      sections: contentSections,
      title,
      //   metadata,
      global: globalLocale,
      pageContext: {
        ...pageContext,
        localizedPaths,
        resolvedUrl,
      },
    },
  }
}

export default DynamicPage
