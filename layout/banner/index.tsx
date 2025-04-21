import Image from 'next/image'
import backageBanner from '@/images/banner.jpg'

const Banner = () => (
  <div className="relative">
    <div className="w-full h-[400px] relative">
      <Image
        src={backageBanner}
        alt="Banner"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 to-background/60" />
    </div>
  </div>
)

export default Banner
