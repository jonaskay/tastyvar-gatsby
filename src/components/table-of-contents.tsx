import { Link } from "gatsby"
import React from "react"

type TableOfContentsItemHeading = {
  title: string
  url: string
}

type TableOfContentsItem = TableOfContentsItemHeading & {
  items?: TableOfContentsItemHeading[]
}

export type TableOfContentsData = { items: TableOfContentsItem[] }

type TableOfContentsProps = {
  data?: TableOfContentsData
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ data }) => (
  <>
    <h2>Table of contents</h2>
    <ul className="list-none">
      {data &&
        data.items.map(item => (
          <li key={item.url} className="my-4 leading-normal">
            <Link className="font-bold" to={item.url}>
              {item.title}
            </Link>
            {item.items && (
              <ul className="ml-6 list-disc">
                {item.items.map(childItem => (
                  <li key={childItem.url}>
                    <Link to={childItem.url}>{childItem.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
    </ul>
  </>
)

export default TableOfContents
