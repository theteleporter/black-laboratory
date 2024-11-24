import ProjectList from '../components/project-list'
import Footer from '../components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#161616] text-stone-200 p-4 font-mono">
      <h1 className="text-xl mb-8 font-light">BLACK LABS</h1>
      <ProjectList />
      <Footer />
    </main>
  )
}

