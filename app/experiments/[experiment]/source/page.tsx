export default function SourceCodePage({ params }: { params: { experiment: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <h1 className="text-2xl font-light mb-4">{params.experiment.toUpperCase()} - Source Code</h1>
      <pre className="bg-[#232323] p-4 rounded-md overflow-x-auto max-w-full">
        <code className="text-stone-200">
          {`// Source code for ${params.experiment} experiment`}
        </code>
      </pre>
    </div>
  )
}

