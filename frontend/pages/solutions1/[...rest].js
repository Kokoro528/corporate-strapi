import ErrorPage from "next/error"
import { getSolutionData, fetchAPI, getGlobalData } from "utils/api"
import Sections from "@/components/sections"
import Seo from "@/components/elements/seo"
import Header from "@/components/elements/header"
import { useRouter } from "next/router"
import Layout from "@/components/layout"
import { getLocalizedPaths } from "utils/localize"

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

  // console.log("router", router)
  // const arr = router.asPath.split("/")

  // Check if the required data was provided
  // if (!router.isFallback) {
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
      <Seo metadata={metadataWithDefaults} />
      {/* Display content sections */}
      <Header title={title}></Header>
      <Sections sections={sections} preview={preview} />
    </Layout>
  )
}

// export async function getStaticPaths(context) {
//   // Get all pages from Strapi
//   const pages = await context.locales.reduce(
//     async (currentPagesPromise, locale) => {
//       const currentPages = await currentPagesPromise
//       const localePages = await fetchAPI("/pages", {
//         locale,
//         fields: ["slug", "locale"],
//       })
//       return [...currentPages, ...localePages.data]
//     },
//     Promise.resolve([])
//   )

//   const paths = pages.map((page) => {
//     const { slug, locale } = page.attributes
//     // Decompose the slug that was saved in Strapi
//     const slugArray = !slug ? false : slug.split("/")

//     return {
//       params: { slug: slugArray },
//       // Specify the locale to render
//       locale,
//     }
//   })

//   return { paths, fallback: true }
// }

export async function getServerSideProps(context) {
  const { params, locale, locales, defaultLocale, preview = null } = context

  const globalLocale = await getGlobalData(locale)
  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getSolutionData({
    // slug: (!params.slug ? [""] : params.slug).join("/"),
    locale,
    preview,
  })
  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} }
  }

  // We have the required page data, pass it to the page component
  const {
    contentSections,
    // metadata,
    localizations,
    title,
  } = pageData.find((e) => e.id == params.rest)?.attributes

  const pageContext = {
    locale,
    locales,
    defaultLocale,
    // slug,
    localizations,
  }

  // const localizedPaths = getLocalizedPaths(pageContext)

  return {
    props: {
      preview,
      sections: contentSections,
      title,
      //   metadata,
      global: globalLocale,
      pageContext: {
        ...pageContext,
        // localizedPaths,
      },
    },
  }
}

export default DynamicPage
