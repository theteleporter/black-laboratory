export default function ExperimentPage({ params }: { params: { experiment: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <h1 className="text-2xl font-light mb-4">{params.experiment.toUpperCase()}</h1>
      <p className="text-stone-400">Experiment content goes here</p>
    </div>
  )
}

