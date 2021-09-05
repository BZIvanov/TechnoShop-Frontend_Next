import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import { Avatar, Badge } from 'antd';
import { uploadImageCall, removeImageCall } from '../../api/cloudinary';

const FileUpload = ({ values, setValues }) => {
  const { user } = useSelector((state) => state.user);

  const fileUploadAndResize = (e) => {
    const allUploadedFiles = [...values.images];

    // loop through all selected files and resize them
    for (const file of e.target.files) {
      Resizer.imageFileResizer(
        file,
        720,
        720,
        'JPEG',
        100,
        0,
        async (uri) => {
          // send the resized files to the backend to upload the images to cloudinary
          try {
            const { data } = await uploadImageCall(uri, user.token);

            allUploadedFiles.push(data);

            setValues({ ...values, images: allUploadedFiles });
          } catch (error) {
            console.log('CLOUDINARY UPLOAD ERROR', error);
          }
        },
        'base64'
      );
    }
  };

  const handleImageRemove = async (public_id) => {
    try {
      // send the image id to the backend to remove it from cloduinary
      await removeImageCall(public_id, user.token);

      // update the form ininitial values.images
      const filteredImages = values.images.filter(
        (img) => img.public_id !== public_id
      );
      setValues({ ...values, images: filteredImages });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='row'>
        {values.images.map((image) => {
          return (
            <Badge
              count='X'
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: 'pointer' }}
            >
              <Avatar
                src={image.url}
                size={80}
                shape='square'
                className='ml-3'
              />
            </Badge>
          );
        })}
      </div>

      <div className='row'>
        <label className='btn btn-primary btn-raised mt-3'>
          <span>Choose File</span>
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
