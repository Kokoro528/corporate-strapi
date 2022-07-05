import classNames from "classnames"

const ModelStructure = ({ data }) => {
  console.log(data)

  // return null
  return (
    <div className="container py-12">
      <h1 className="text-4xl text-center">{data.title}</h1>
      <div className="flex flex-col lg:grid lg:grid-cols-6 gap-4 lg:justify-center lg:w-lg max-w-screen-lg mx-auto  mt-6">
        {data.modelComponents.map((modelComponent) => (
          <div
            className={classNames(
              // Common classes
              "rounded-md border-2 py-4 px-4 flex-1 md:w-lg"
              // Normal modelComponent
            )}
            key={`mc-${modelComponent.name}`}
          >
            <h2 className="text-2xl white-space-nowrap">
              {modelComponent.chineseTitle}
            </h2>
            <span>{modelComponent.name}</span>
            <p className={classNames("mt-4 text-sm")}>
              {modelComponent.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ModelStructure
