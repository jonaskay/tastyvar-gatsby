import React from "react"

const Code: React.FC<any> = props => (
  <code
    className="block overflow-x-auto bg-gray-100 p-4 border rounded font-mono"
    tabIndex={0}
    {...props}
  />
)

export default Code
