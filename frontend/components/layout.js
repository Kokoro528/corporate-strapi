import { useState, Fragment } from "react"
import Navbar from "./elements/navbar"
import Footer from "./elements/footer"
import NotificationBanner from "./elements/notification-banner"
import Products from "./global/products"
import Context from "./context"
import { DefaultSeo } from "next-seo"
import { SWRConfig } from "swr"
import { useSession } from "next-auth/react"

const fetcher = (session) => (url) =>
  fetch(
    url,
    Object.assign(
      {},
      {
        headers: Object.assign(
          {
            "Content-Type": "application/json",
          },
          session ? { Authorization: "Bearer " + session?.accessToken } : {}
        ),
      }
    )
  ).then((r) => {
    if (!r.ok) {
      throw new Error(r.status)
    }
    return r.json()
  })

const Auth = ({ children }) => {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"

  // if (status === "loading") {
  //   return <div>Loading...</div>
  // }

  console.log("session", session)

  return null
}

const Layout = ({ children, global, metadata }) => {
  const { data: session, status } = useSession()
  const { navbar, footer, notificationBanner, metaTitleSuffix } =
    global.attributes
  const { metaTitle, metaDescription, shareImage, twitterCardType } =
    metadata || {}
  const [bannerIsShown, setBannerIsShown] = useState(true)
  return (
    <>
      <DefaultSeo
        titleTemplate={`%s | ${metaTitleSuffix}`}
        title="Page"
        description={metaDescription}
      />

      <div className="flex flex-col justify-between min-h-screen">
        {notificationBanner && bannerIsShown && (
          <NotificationBanner
            data={notificationBanner}
            closeSelf={() => setBannerIsShown(false)}
          />
        )}
        <div className="flex-1">
          <div className="overflow-visible">
            <Navbar navbar={navbar} global={global} />

            <SWRConfig
              value={{
                fetcher: fetcher(session),
                provider: () => new Map(),
                onErrorRetry: (err, key) => {
                  fetcher(key)
                },
                onError: (err, key, config) => {
                  // console.log("asjdk", key, err)
                },
                onSuccess: (data, key, config) => {
                  // console.log("asd", key, data)
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
            <Footer footer={footer} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
