import { imageEMT } from "utils/media"
import Tabs from "../collations/tabs"
import Sections, { sectionComponents } from "../sections"
import NextImage from "../elements/image"

const SoftwareList = ({ data }) => {
  // console.log("da", data)
  const { software } = data
  const swlst = software.data?.map((e) =>
    Object.assign(
      {},
      e.attributes,
      {
        title: !imageEMT(e.attributes.icon) ? (
          <NextImage media={e.attributes.icon} />
        ) : (
          e.attributes.productId
        ),
      },
      { component: () => <Sections sections={e.attributes.intro} /> }
    )
  )

  console.log(swlst)

  return <Tabs tabList={swlst} />
}

export default SoftwareList
