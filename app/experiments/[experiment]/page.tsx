'use client'

import { useParams } from 'next/navigation'

export default function ExperimentPage() {
  const params = useParams()
  const experimentName = params.experiment as string
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <h1 className="text-2xl font-light mb-4">{experimentName.toUpperCase()}</h1>
      <p className="text-stone-400">Experiment content goes here</p>
    </div>
  )
}

