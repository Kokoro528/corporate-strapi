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
// import fetcher from "utils/fetcher"
// import "@/styles/nav.css"
// import "@/styles/table.css"

const fetcher = (session) => (url) =>
  fetch(
    url,
    Object.assign(
      {},
      {
        headers: Object.assign( {
          "Content-Type": "application/json",
        }, session?{Authorization: "Bearer " + session?.accessToken,}:{})
      },

    )
  ).then((r) => {
    if (!r.ok) {
      throw new Error(r.status)
    }
    return r.json()
  })

const Auth = ({ children }) => {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { data: session, status } = useSession()

  // if (status === "loading") {
  //   return <div>Loading...</div>
  // }

  console.log("session", session)

  return (
    <SWRConfig
      value={{
        fetcher: fetcher(session),
        provider: () => new Map(),

        onErrorRetry: (err, key) => {
          fetcher(key)
        },
        onError: (err, key, config) => {
          console.log('asjdk', key, err)
        },
        onSuccess: (data, key, config) => {
          console.log("asd", key, data)
          if (data.data) {
            const paragraph = key.split(",")[0]
            const regex = /@\"(.*)\"/
            const found = paragraph.replace(regex, "$1")

            mutate(found, data)
          }
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}
const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  // Extract the data we need
  const { global } = pageProps
  if (global == null) {
    return <ErrorPage statusCode={404} />
  }

  const { metadata, favicon,  metaTitleSuffix} = global.attributes
  console.log("global", global.attributes, metaTitleSuffix)

  return (
    <SessionProvider session={session}>
      {/* Favicon */}
      {/* Display the content */}
      <Auth>
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

        <Component {...pageProps} />
      </Auth>
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
  // console.log("locale", appContext.router.locale)
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
