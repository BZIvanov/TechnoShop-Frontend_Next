import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    const files = e.target.files;
    const allUploadedFiles = values.images;

    if (files) {
      setLoading(true);

      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                { headers: { authtoken: user ? user.token : '' } }
              )
              .then((res) => {
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log('CLOUDINARY UPLOAD ERR', err);
              });
          },
          'base64'
        );
      }
    }
  };

  return (
    <>
      <div className='row'>
        {values.images &&
          values.images.map((image) => (
            <Avatar
              key={image.public_id}
              src={image.url}
              size={100}
              className='m-3'
            />
          ))}
      </div>
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
    </>
  );
};

export default FileUpload;
