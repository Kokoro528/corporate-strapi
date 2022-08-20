import Link from "next/link"
import PropTypes from "prop-types"
import { linkPropTypes } from "utils/types"

const RichLink = (props) => {
  const { richtext, url, newTab, text, type, icon } = props
  return (
    <div
    className={classNames(
      // Common classes
      "rounded-md  col-span-6 md:col-span-2  flex flex-col items-center flex-1 md:w-lg",
      "bg-gradient-to-t from-sky-100 via-sky-50 to-slate-50 ",
      {
        "md:col-start-2 md:col-end-4": idx % 5 === 0,
        "md:col-start-4 md:col-end-6": idx % 5 === 1,
        "md:col-start-3 md:col-end-5": idx % 5 === 3,
        "md:col-start-1 md:col-end-3": idx % 5 === 2,
        "md:col-start-5 md:col-end-7 ": idx % 5 === 4,
      }
    )}
    key={id}
  >
    {icon && (
      <div className="w-full rounded-t aspect-video relative">
        <NextImage
          media={icon}
          layout="fill"
          width="16"
          height="12"
          className="rounded-t-md object-cover"
        />
      </div>
    )}
    <h2 className="text-xl font-bold text-neutral-600">{text}</h2>
    <Markdown
      className={classNames( {
        "flex-auto": true,
        "border-1": true,
      })}
    >
      {richtext}
    </Markdown>
    <div className="flex flex-none flex-row flex-wrap ">
      {buttons.map((button) => (
        <ButtonLink
          button={button}
          appearance={getButtonAppearance(button.type, "light")}
          compact
          key={button.id}
        />
      ))}
    </div>
  </div>
  )

}



export default RichLink
