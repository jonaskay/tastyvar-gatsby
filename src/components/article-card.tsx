import React from "react"
import { Link } from "gatsby"

type ArticleCardProps = {
  date: string
  published: boolean
  title: string
  to: string
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  date,
  published,
  title,
  to,
}) => (
  <Link
    to={to}
    className="card article-card flex flex-col justify-between hover:border-orange-300 hover:bg-orange-100 hover:shadow-md transition ease-in-out duration-200"
  >
    <div className="article-card-content flex flex-col justify-between flex-grow p-4 border-b border-indigo-300 shadow-sm transition ease-in-out duration-200">
      <h3 className="mb-6 text-xl font-bold">
        {title}
        {!published && (
          <>
            <div className="font-normal text-lg">
              <span role="img" aria-label="work-in-progress">
                🚧
              </span>
              &nbsp;work-in-progress&nbsp;
              <span role="img" aria-label="work-in-progress">
                🚧
              </span>
            </div>
          </>
        )}
      </h3>
      <div className="text-right text-base">{date}</div>
    </div>
    <div className="article-card-image circuit-board px-2 pt-8 pb-8 text-right transition ease-in-out duration-200">
      <span className="article-card-button px-4 py-2 rounded bg-indigo-300 shadow transition ease-in-out duration-100">
        Read
      </span>
    </div>
  </Link>
)

export default ArticleCard
