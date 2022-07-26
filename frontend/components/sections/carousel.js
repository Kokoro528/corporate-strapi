import NextImage from "../elements/image"
import Carousel from "react-grid-carousel"

const Gallery = ({ data }) => {
  console.log("data", data)
  return (
    <div className="container flex flex-col lg:flex-row  gap-12 align-top py-12 w-full  flex place-content-center">
      <Carousel
        cols={3}
        rows={1}
        loop
        containerClassName={" w-full px-9"}
        responsiveLayout={[
          {
            breakpoint: 1024,
            cols: 3,
            rows: 1,
            gap: 10,
            loop: true,
            autoplay: 1000,
          },
        ]}
      >
        {data.cards?.map((e) => (
          <Carousel.Item key={"carousel-item-" + e.id}>
            {/* <div className="w-200" > */}
            {/* <NextImage media={e.picture} /> */}
            <div
              className={` relative px-7 carousel`}
              key={`carousel-${Math.random()}`}
            >
              <img src={e.picture.data?.attributes?.url} className="w-full" />
              <div className="absolute inset-y-1/2 carousel-text">
                <h3>sjklj</h3>
                <p>ajsldkajfsd;sdfeleakj</p>
              </div>
            </div>

            {/* </div> */}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default Gallery
