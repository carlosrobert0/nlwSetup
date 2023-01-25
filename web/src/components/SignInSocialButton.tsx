import { ButtonHTMLAttributes } from 'react'
import { ReactSVG } from 'react-svg'

interface Props extends ButtonHTMLAttributes<HTMLElement> {
  title: string
  svg: string
}

export function SignInSocialButton({ title, svg, ...rest }: Props) {
  return (
    <button
      className="flex h-14 w-50 items-center justify-start rounded-md border-b border-green-400 hover:bg-gradient-to-t from-green-900 via-transparent to-transparent transition-all"
      {...rest}
    >
      <div className="flex h-full items-center justify-center pl-2 pr-4">
        <ReactSVG src={svg} />
      </div>

      <h2 className="text-center font-heebo text-base pr-2">{title}</h2>
    </button>
  )
}
