import Image from 'next/image'
import backageBanner from '@/images/banner.jpg'

const Banner = () => (
  <div className="relative z-10">
    <div className="w-full h-[350px] relative">
      <Image
        src={backageBanner}
        alt="Banner"
        fill
        className="object-cover"
        priority
      />
    </div>
  </div>
)

export default Banner
