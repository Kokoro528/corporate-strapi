import dynamic from "next/dynamic"
import CustomLink from "../elements/custom-link"
// import Bilibili from "@/components/icons/sns/bilibili"
import AiFillWechat from "@react-icons/all-files/ai/AiFillWechat"
import { RiBilibiliFill } from "@react-icons/all-files/ri/RiBilibiliFill"
import { SiZhihu } from "@react-icons/all-files/si/SiZhihu"
import { RiWechat2Line } from "@react-icons/all-files/ri/RiWechat2Line"
import NextImage from "../elements/image"

const icons = {
  // ["wechat" || "weixin"]: dynamic(() => import("@/components/icons/sns/weixin.svg")),
  // "bilibili": dynamic(() => import("@/components/icons/sns/bilibili.svg"))
  // "bilibili": dynamic(() => import("@react-icons/all-files/ri/RiBilibiliFill"))
  bilibili: RiBilibiliFill,
  zhihu: SiZhihu,
  wechat: RiWechat2Line,
}

const SNS = ({ data }) => {
  // alert(JSON.stringify(data))
  const { platforms } = data
  // const icon = dynamic((platform) => import(`@/components/icons/sns/${platform.title}.svg`))
  return (
    <div className="flex mx-auto">
      {platforms.map((platform) => {
        const Icon = icons[platform.title]
        if (platform.url) {
          return (
            <CustomLink
              key={`sns-${Math.random()}`}
              className=""
              link={platform}
            >
              {/* {icon} */}
              {/* {platform.title} */}
              <Icon />
              {/* {icon} */}
            </CustomLink>
          )
        }
        return (
          <a key={`sns-${Math.random()}`} className=" block qrcode-container ">
            <Icon className="" />
            <div className=" hidden qrcode w-40 h-40">
              <NextImage media={platform.icon} />
            </div>
          </a>
        )
      })}
    </div>
  )
}
export default SNS
