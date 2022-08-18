import App from "next/app"
import Head from "next/head"
import ErrorPage from "next/error"
import { useRouter } from "next/router"
import { DefaultSeo } from "next-seo"
import { getStrapiMedia } from "utils/media"
import { getGlobalData } from "utils/api"
import "@/styles/index.css"
import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"
import { mutate, SWRConfig } from "swr"
import Context from "@/components/context"
// import fetcher from "utils/fetcher"
// import "@/styles/nav.css"
// import "@/styles/table.css"

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  // Extract the data we need
  const { global } = pageProps
  if (global == null) {
    return <ErrorPage statusCode={404} />
  }

  const { metadata, favicon, metaTitleSuffix } = global.attributes
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SessionProvider session={session}>
      {/* Favicon */}
      {/* Display the content */}
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(favicon.data.attributes.url)}
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/flowbite@1.4.7/dist/flowbite.min.css"
        />
        <script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></script>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
        {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/pixelbrackets/gfm-stylesheet/dist/gfm.min.css" /> */}
      </Head>
      {/* Global site metadata */}
      <DefaultSeo
        titleTemplate={`%s | ${metaTitleSuffix}`}
        title="Page"
        description={metadata.metaDescription}
        openGraph={{
          images: Object.values(
            metadata.shareImage.data?.attributes.formats
          ).map((image) => {
            return {
              url: getStrapiMedia(image.url),
              width: image.width,
              height: image.height,
            }
          }),
        }}
        twitter={{
          cardType: metadata.twitterCardType,
          handle: metadata.twitterUsername,
        }}
      />

      {/* <Auth> */}
      <Context.Provider value={{ global: pageProps.global }}>
        {getLayout(<Component {...pageProps} />)}
      </Context.Provider>
      {/* </Auth> */}
    </SessionProvider>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getServerSideProps = async (appContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  // console.log("locale", appContext)
  const appProps = await App.getServerSideProps(appContext)
  console.log("locale", appContext.router.locale)
  const globalLocale = await getGlobalData(appContext.router.locale)
  // ("globalLocale", globalLocale?.attributes?.metadata.shareImage )
  return {
    ...appProps,
    pageProps: {
      global: globalLocale,
    },
  }
}

export default MyApp
