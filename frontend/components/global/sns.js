import dynamic from "next/dynamic"
import CustomLink from "../elements/custom-link"
// import Bilibili from "@/components/icons/sns/bilibili"
import { AiFillWechat } from "@react-icons/all-files/ai/AiFillWechat"
import { RiBilibiliLine } from "@react-icons/all-files/ri/RiBilibiliLine"
import { SiZhihu } from "@react-icons/all-files/si/SiZhihu"
import { RiWechat2Line } from "@react-icons/all-files/ri/RiWechat2Line"
import NextImage from "../elements/image"

const icons = {
  // ["wechat" || "weixin"]: dynamic(() => import("@/components/icons/sns/weixin.svg")),
  // "bilibili": dynamic(() => import("@/components/icons/sns/bilibili.svg"))
  // "bilibili": dynamic(() => import("@react-icons/all-files/ri/RiBilibiliFill"))
  bilibili: RiBilibiliLine,
  zhihu: SiZhihu,
  wechat: AiFillWechat,
}

const SNS = ({ data }) => {
  // alert(JSON.stringify(data))
  const { platforms } = data
  // const icon = dynamic((platform) => import(`@/components/icons/sns/${platform.title}.svg`))
  return (
    <div className="flex flex-col text-3xl mt-10 lg:mt-0 w-6/12 lg:w-auto ">
      {/* <span className="uppercase text-center tracking-wide font-semibold text-gray-200 text-xl">
        关注我们
      </span> */}
        <ul className="flex relative ">
          {
            platforms.map((platform) => {
              const Icon = icons[platform.title]
              return platform.url ? (
                <CustomLink
                  key={`sns-${Math.random()}`}
                  className="p-2"
                  link={platform}
                >
                  {/* {icon} */}
                  {/* {platform.title} */}
                  <div className="relative rounded-full  bg-gray-200 p-2">
                    <Icon className="text-white" />
                  </div>

                  {/* {icon} */}
                </CustomLink>
              ) : (
                <a key={`sns-${Math.random()}`} className=" qrcode-container p-2">
                 <div className="absolute  qrcode">
                    {/* <div className=" w-20 h-20"> */}
                      <NextImage media={platform.icon} />
                    {/* </div> */}
                  </div>
                  <div className=" rounded-full bg-gray-200 p-2 qrcode-icon">
                    <Icon className="text-white" />
                  </div>
                   
                </a>

              )
            })}
        </ul>


    </div>
  )
}
export default SNS
