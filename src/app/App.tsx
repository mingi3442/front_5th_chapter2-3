import { PostsManagerPage } from "@/pages/posts/manager"

import { Footer } from "@/widgets/common/footer"
import { Header } from "@/widgets/common/header"
import { BrowserRouter as Router } from "react-router-dom"
import { TanstackQueryProvider } from "./provider/tanstack-query"
import "./styles/index.css"

const App = () => {
  return (
    <TanstackQueryProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </Router>
    </TanstackQueryProvider>
  )
}

export default App
