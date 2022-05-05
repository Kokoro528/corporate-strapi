import classNames from "classnames"
import ButtonLink from "../elements/button-link"
import { getButtonAppearance } from "utils/button"

const TopHeading = ({ data }) => {
  const style = {
    backgroundImage: "url(" + data.backgroundImage.data.attributes.url + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  }
  return (
    <section
      className={classNames("bg-primary-800 py-20 text-center ")}
      style={style}
    >
      <h2 className="title text-white mb-10">{data.title}</h2>
      {/* Buttons row */}
      <div className="container flex flex-row justify-center flex-wrap gap-4">
        <p className=" text-white mb-10 mx-40">{data.abstract}</p>

        {data.buttons &&
          data.buttons.map((button) => (
            <ButtonLink
              button={button}
              appearance={getButtonAppearance(button.type, "light")}
              key={button.id}
            />
          ))}
      </div>
    </section>
  )
}

export default TopHeading
