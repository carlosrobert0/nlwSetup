import { ButtonHTMLAttributes } from 'react'
import { ReactSVG } from 'react-svg'

interface Props extends ButtonHTMLAttributes<HTMLElement> {
  title: string
  svg: string
}

export function SignInSocialButton({ title, svg, ...rest }: Props) {
  return (
    <button
      className="mt-4 mb-4 flex h-14 w-52 items-center justify-center rounded-md border-b border-green-400 hover:bg-gradient-to-t from-green-900 via-transparent to-transparent transition-all"
      {...rest}
    >
      <div className="flex h-full items-center justify-center p-4">
        <ReactSVG src={svg} />
      </div>

      <h2 className="text-center font-heebo text-base">{title}</h2>
    </button>
  )
}
