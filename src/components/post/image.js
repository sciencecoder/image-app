import propTypes from 'prop-types';

export default function Image({imageSrc, caption}) {

  return (
    <div>
      <img src={imageSrc} alt={caption}/>
    </div>
  )
}

Image.propTypes = {
  imageSrc: propTypes.string,
  caption: propTypes.string
}