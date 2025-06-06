import { useState } from "react"
import { InputTest } from "components_ui/InputTest"
import { List } from "components_ui/List"

function User() {
  const [count, setCount] = useState(0)

  return (
    <>
      <InputTest value={count} onChange={setCount} onSubmit={() => setCount((count) => count + 1)} />
      <List items={["User UI", "Learn Vite", "Make an awesome app"]} />
    </>
  )
}

export default User;
