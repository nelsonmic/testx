const ImageUploader = (props) => {
  return (
    <span
      className="image-uploader"
      style={{
        width: props.width,
        height: props.height,
        marginBottom: props.marginBottom,
      }}
    >
      <input
        type="file"
        name="profile-photo"
        accept="image/*"
        onChange={(e) => {
          props.uploadImage(e.target.files[0], props.changeImage, props.uploadErrorMessage);
        }}
      />
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        color="#d40000"
      >
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
      </svg>
    </span>
  );
};

export default ImageUploader;
