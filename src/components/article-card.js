import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const ArticleCard = ({ to, title, date, published }) => (
  <Link
    to={to}
    className="card article-card flex flex-col justify-between hover:border-orange-300 hover:bg-orange-100 hover:shadow-md transition ease-in-out duration-200"
  >
    <div className="article-card-content flex flex-col justify-between flex-grow p-4 border-b border-indigo-300 shadow-sm transition ease-in-out duration-200">
      <h3 className="mb-6 text-xl font-bold">
        {title}
        {!published && (
          <>
            <br />
            <span className="font-normal">🚧 work-in-progress 🚧</span>
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

ArticleCard.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}

export default ArticleCard
