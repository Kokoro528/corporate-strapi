import classNames from "classnames"

export default ({ data }) => {
    const style = {
        backgroundImage:"url(" + data.backgroundImage.data.attributes.url + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'    
    }
  return (
    <section className={classNames("bg-primary-800 py-20 text-center ", 
    // {[`bg-url('${data.backgroundImage.data.attributes.url}')`]: true}
    )
    } style={style} >
      <h2 className="title text-white mb-10">{data.title}</h2>
      {/* Buttons row */}
      <div className="container flex flex-row justify-center flex-wrap gap-4">
      
      </div>
    </section>
  )
}


