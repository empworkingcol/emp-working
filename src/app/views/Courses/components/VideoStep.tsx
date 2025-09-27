
type PropsVideoStep = {
  video_id: string
}

const VideoStep = (props: PropsVideoStep) => {

  const { video_id } = props;
  const src = `https://www.youtube.com/embed/${video_id}`;

  return (
    <iframe
      className='w-full aspect-video'
      src={src}
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
      title='Video del curso'
    ></iframe>
  );
};

export default VideoStep;
