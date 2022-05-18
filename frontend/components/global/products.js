// import { MdCheckBox } from "react-icons/md"
import classNames from "classnames"
import CustomLink from "../elements/custom-link"
import NextImage from "../elements/image"
import Image from "next/image"

const Products = ({ products, moreInfo }) => {
  return (
    <div className="relative rounded bg-primary-50 px-5 py-4 lg:justify-center right-0 top-20">
      <ul className="mt-4 flex flex-col gap-3">
        {products.map((product) => (
          <li key={product.id}>
            <CustomLink
              className="flex flex-row justify-between items-center text-left"
              link={product}
            >
              <NextImage
                media={product.icon}
                height={20}
                width={150}
                objectFit="contain"
                objectPosition="left"
              />
            </CustomLink>
          </li>
        ))}
      </ul>
      <div className="my-4">
        <CustomLink
          link={moreInfo}
          className="flex flex-row justify-between items-center text-gray-100"
        >
          {`>>${moreInfo.text}`}
        </CustomLink>
      </div>
    </div>
  )
}

export default Products
