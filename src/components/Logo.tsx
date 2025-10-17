import Image from 'next/image'

interface LogoProps {
  className?: string
}

const Logo = ({ className = "w-8 h-8" }: LogoProps) => {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <Image
        src="/logo.svg?v=2"
        alt="VeloceAI"
        width={32}
        height={32}
        className="w-full h-full object-contain"
      />
    </div>
  )
}

export default Logo
