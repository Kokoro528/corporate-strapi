import { MdCheckBox } from "react-icons/md"
import classNames from "classnames"
import NextImage from "../elements/image"
import ButtonLink from "../elements/button-link"
import { getButtonAppearance } from "utils/button"
const InfoCards = ({ data }) => {
  return (
    <div className="container py-12">
      <h1 className="text-4xl text-center">{data.title}</h1>
      <div className="grid grid-cols-3 flex-col lg:flex-row gap-4 lg:justify-center mt-6">
        {data.Cards.map((card) => (
          <div
            className={classNames(
              // Common classes
              "rounded-md border-2 flex flex-col items-center py-4 px-4 flex-1 md:w-lg"
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
            {card.logo && card.logo.data && <div className="w-32 h-32">
               <NextImage media={card.logo} />
            </div> }
            <h2 className="text-2xl font-bold text-indigo-700">{card.title}</h2>
            <p
              className={classNames("my-4 text-md", {
                // "text-primary-700": plan.isRecommended,
                // "text-gray-700": !plan.isRecommended,
                "flex-auto": true,
              })}
            >
              {card.description}
            </p>
            {/* <p className="text-3xl mt-4">
                            {plan.price === 0 ? "Free " : `$${plan.price} `}
                            <span className="text-base font-medium">{plan.pricePeriod}</span>
                        </p> */}
            <div className="flex flex-none flex-row  flex-wrap ">
              {card.buttons.map((button) => (
                <ButtonLink
                  button={button}
                  appearance={getButtonAppearance(button.type, "light")}
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
