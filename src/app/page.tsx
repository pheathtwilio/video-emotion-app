'use client'

import dynamic from "next/dynamic"

const VideoEmotionDetector = dynamic(() => import('components/videoEmotionDetector'), {
  ssr: false,
})

export default function Home() {

  return <VideoEmotionDetector />

}
