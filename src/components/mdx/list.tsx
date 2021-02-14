import React from "react"

type ListComponent = React.FC<any> & { Item: React.FC<any> }

const ListItem: React.FC<any> = props => <li className="my-2" {...props} />

const List: ListComponent = props => (
  <ul className="list-disc ml-8" {...props} />
)

List.Item = ListItem

export default List
