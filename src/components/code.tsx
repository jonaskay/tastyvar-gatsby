import React from "react"

type CodeProps = {
  children: React.ReactNode
}

const Code: React.FC<CodeProps> = ({ children }) => (
  <code tabIndex={0}>{children}</code>
)

export default Code
