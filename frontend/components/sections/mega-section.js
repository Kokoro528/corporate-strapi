import { MdCheckBox } from "react-icons/md"
import classNames from "classnames"
import NextImage from "../elements/image"
import ButtonLink from "../elements/button-link"
import { getButtonAppearance } from "utils/button"
import Markdown from "react-markdown"
const InfoCards = ({ data }) => {
  return (
    <div className="container py-12">
      <h1 className="text-4xl text-center">{data.title}</h1>,
      <Markdown>{data.description}</Markdown>
      <div className="grid  grid-flow-col flex-col md:flex-row gap-4 md:justify-center mt-6">
        {data.cards &&
          data.cards.length &&
          data.cards.map((card) => (
            <div
              className={classNames(
                // Common classes
                "rounded-md border-1 flex flex-col items-center py-4 px-4 flex-1 md:w-lg",
                "bg-gradient-to-t from-sky-100 via-sky-50 to-slate-50"
                // Normal plan
                //   {
                //     "bg-gray-100 text-gray-900 border-gray-300":
                //       !plan.isRecommended,
                //   },
                //   // Recommended plan
                //   {
                //     "bg-primary-100 text-primary-900 border-primary-300":
                //       plan.isRecommended,
                //   }
              )}
              key={card.id}
            >
              {card.logo && card.logo.data && (
                <div className="w-32 h-32">
                  <NextImage media={card.logo} />
                </div>
              )}
              <h2 className="text-xl font-bold text-neutral-600">
                {card.title}
              </h2>
              <p
                className={classNames("my-4 text-md", {
                  // "text-primary-700": plan.isRecommended,
                  // "text-gray-700": !plan.isRecommended,
                  "flex-auto": true,
                })}
              >
                {card.description}
              </p>
              <div className="flex flex-none flex-row  flex-wrap ">
                {card.buttons.map((button) => (
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
