import { useState } from "react"
import Navbar from "./elements/navbar"
import Footer from "./elements/footer"
import NotificationBanner from "./elements/notification-banner"
import Products from "./global/products"
import Context from "./context"
import { DefaultSeo } from "next-seo"
const Layout = ({ children, global, pageContext, metadata }) => {
  const { navbar, footer, notificationBanner } = global.attributes
  const {
    metaTitle,
    metaDescription,
    shareImage,
    twitterCardType,
    metaTitleSuffix,
  } = metadata || {}
  const [bannerIsShown, setBannerIsShown] = useState(true)
  return (
    <>
      <DefaultSeo
        titleTemplate={`%s | ${metaTitleSuffix}`}
        title="Page"
        description={metaDescription}
        // openGraph={{
        //   images: Object.values(
        //     metadata.shareImage.data?.attributes.formats
        //   ).map((image) => {
        //     return {
        //       url: getStrapiMedia(image.url),
        //       width: image.width,
        //       height: image.height,
        //     }
        //   }),
        // }}
      />

      <div className="flex flex-col justify-between min-h-screen">
        {/* Aligned to the top */}
        <div className="flex-1">
          {notificationBanner && bannerIsShown && (
            <NotificationBanner
              data={notificationBanner}
              closeSelf={() => setBannerIsShown(false)}
            />
          )}
          {/* <Context.Provider value={{ global, pageContext }}> */}
          <Navbar navbar={navbar} pageContext={pageContext} global={global} />
          {/* </Context.Provider> */}
          <div>
            <Context.Provider value={{ global, pageContext }}>
              {children}
            </Context.Provider>
          </div>
        </div>
        {/* Aligned to the bottom */}
        <Footer footer={footer} />
      </div>
    </>
  )
}

export default Layout
