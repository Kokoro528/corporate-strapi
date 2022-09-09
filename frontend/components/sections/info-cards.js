import { MdCheckBox } from "react-icons/md"
import classNames from "classnames"
import NextImage from "../elements/image"
import ButtonLink from "../elements/button-link"
import { getButtonAppearance } from "utils/button"
import Markdown from "react-markdown"
const InfoCards = ({ data }) => {
  return (
    <div className="container py-20">
      <Markdown className="top-heading">{data.richtext}</Markdown>
      <div className="grid mx-12 grid-cols-6 gap-4 grid-flow-dense flex-col md:flex-row md:gap-12 md:justify-center mt-6">
        {data.cards.map((card, idx) => (
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
            key={card.id}
          >
            {card.picture && (
              <div className="w-full rounded-t aspect-video relative">
                <NextImage
                  media={card.picture}
                  layout="fill"
                  width="16"
                  height="12"
                  className="rounded-t-md object-cover"
                />
              </div>
            )}
            <h2 className="text-xl font-bold text-neutral-600">{card.title}</h2>
            <Markdown
              className={classNames("info-card", {
                // "text-primary-700": plan.isRecommended,
                // "text-gray-700": !plan.isRecommended,
                "flex-auto": true,
                "border-1": true,
              })}
            >
              {card.description}
            </Markdown>
            <div className="flex flex-none flex-row  flex-wrap ">
              {card.buttons?.map((button) => (
                <ButtonLink
                  button={button}
                  appearance={getButtonAppearance(button.type, "light")}
                  compact
                  key={button.id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfoCards
