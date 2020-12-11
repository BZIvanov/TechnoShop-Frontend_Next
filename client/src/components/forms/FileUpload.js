const FileUpload = () => {
  const fileUploadAndResize = (e) => {
    console.log(e.target.files);
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
