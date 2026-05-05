import trainingVideo from '../assets/betinho_video_01.mp4'

export default function VideoSection() {
  return (
    <section
      id="video"
      data-testid="video-section"
      className="w-full h-[300px] md:h-[420px] lg:h-[70vh] overflow-hidden bg-black"
      aria-label="Vídeo de entrenamiento"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="w-full h-full object-cover"
      >
        <source src={trainingVideo} type="video/mp4" />
      </video>
    </section>
  )
}
