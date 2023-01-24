interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="max-w-full h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        role="progressbar"
        aria-label="Progresso de habitos completados nesse dia"
        aria-valuenow={progress}
        className="h-3 rounded-xl bg-green-400 transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}