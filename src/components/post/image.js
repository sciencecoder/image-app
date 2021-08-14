import propTypes from 'prop-types';

export default function Image({imageSrc, caption}) {
  console.log(imageSrc)
  return (
    <div>
      <img src={imageSrc} alt=''/>
    </div>
  )
}

Image.propTypes = {
  imageSrc: propTypes.string,
  caption: propTypes.string
}