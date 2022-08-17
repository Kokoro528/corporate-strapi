import ErrorPage from "next/error"
import { getPageData, fetchAPI, getGlobalData, getSingleDoc } from "utils/api"
import Sections from "@/components/sections"
import Seo from "@/components/elements/seo"
import { useRouter } from "next/router"
import Layout from "@/components/layout"
import { getLocalizedPaths } from "utils/localize"
import FilterTabs from "@/components/filter-tabs"

// import { options } from "./api/auth/[...nextauth]"
// import { unstable_getServerSession } from "next-auth"

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const DynamicPage = ({
  sections,
  metadata,
  preview,
  global,
  pageContext,
  slug,
  session,
}) => {
  const router = useRouter()

  // Check if the required data was provided
  if (!router.isFallback && !sections?.length) {
    return <ErrorPage statusCode={404} />
  }

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">Loading...</div>
  }

  // Merge default site SEO settings with page specific SEO settings
  // if (metadata.shareImage?.data == null) {
  //   delete metadata.shareImage
  // }
  const metadataWithDefaults = {
    ...global.attributes.metadata,
    ...metadata,
  }

  console.log("slug", slug)
  return (
    <Layout
      global={global}
      pageContext={pageContext}
      metadata={metadataWithDefaults}
      session={session}
    >
      {/* Add meta tags for SEO*/}
      {/* <Seo metadata={metadataWithDefaults} /> */}
      {/* Display content sections */}
      <FilterTabs
        menubar={global?.attributes?.navbar.links.find((e) =>
          slug ? e.url.includes(slug.substring(1).split("/")[0]) : null
        )}
      >
        {/* <CaseList
          data={data?.filter((e) =>
            category ? e.attributes.category === category : true
          )}
          page={page}
        ></CaseList> */}

        <Sections sections={sections} preview={preview} />
      </FilterTabs>
    </Layout>
  )
}

export async function getStaticPaths(context) {
  // Get all pages from Strapi
  const pages = await context.locales.reduce(
    async (currentPagesPromise, locale) => {
      const currentPages = await currentPagesPromise
      const localePages = await fetchAPI("/pages", {
        locale,
        fields: ["slug", "locale"],
      })
      return [...currentPages, ...localePages.data]
    },
    Promise.resolve([])
  )

  const paths = pages.map((page) => {
    const { slug, locale } = page.attributes
    // Decompose the slug that was saved in Strapi
    const slugArray = !slug ? false : slug.split("/")

    return {
      params: { slug: slugArray },
      // Specify the locale to render
      locale,
    }
  })

  return { paths, fallback: true }
}

export async function getStaticProps(context) {
  const { params, locale, locales, defaultLocale, preview = null } = context

  const globalLocale = await getGlobalData(locale)
  // const session = await unstable_getServerSession(context.req, context.res, options)
  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getPageData({
    slug: (!params.slug ? [""] : params.slug).join("/"),
    locale,
    preview,
  })
  console.log(
    "slug",
    params.slug,
    (!params.slug ? [""] : params.slug).join("/"),
    pageData
  )

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} }
  }

  // We have the required page data, pass it to the page component
  const { contentSections, metadata, localizations, slug } = pageData.attributes

  const pageContext = {
    locale,
    locales,
    defaultLocale,
    slug,
    localizations,
  }

  const localizedPaths = getLocalizedPaths(pageContext)

  return {
    props: {
      preview,
      sections: contentSections,
      metadata,
      global: globalLocale,
      slug: slug,
      pageContext: {
        ...pageContext,
        localizedPaths,
      },
    },
  }
}

export default DynamicPage
