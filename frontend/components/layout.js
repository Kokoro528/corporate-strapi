import { useState, Fragment } from "react"
import Navbar from "./elements/navbar"
import Footer from "./elements/footer"
import NotificationBanner from "./elements/notification-banner"
import Products from "./global/products"
import Context from "./context"
import { DefaultSeo } from "next-seo"
import { SWRConfig } from "swr"
import { useSession } from "next-auth/react"

const Layout = ({ children, global, metadata }) => {
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

            {children}
            <Footer footer={footer} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
