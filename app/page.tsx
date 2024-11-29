import ExperimentsList from '../components/experiments-list'
import ServerFooter from '../components/server-footer'
import { Logo } from '../components/logo'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#161616] text-stone-200 p-4 font-mono">
      <div className="mb-8">
      <Logo />
      </div>
      <ExperimentsList />
      <ServerFooter />
    </main>
  )
}

