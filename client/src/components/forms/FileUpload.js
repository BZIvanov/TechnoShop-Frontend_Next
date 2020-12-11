import Resizer from 'react-image-file-resizer';

const FileUpload = () => {
  const fileUploadAndResize = (e) => {
    const files = e.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            console.log(uri);
          },
          'base64'
        );
      }
    }
  };

  return (
    <div className='row'>
      <label className='btn btn-primary'>
        Choose File
        <input
          type='file'
          multiple
          hidden
          accept='images/*'
          onChange={fileUploadAndResize}
        />
      </label>
    </div>
  );
};

export default FileUpload;
