import { useState, useEffect, FC } from 'react';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface ImageFile {
  imageUrl?: string;
}

type ImageProp = File | ImageFile;

interface PreviewImageAvatarProps {
  image: ImageProp; // Image can either be a File or an object with `imageUrl`
  removeImage?: (image: ImageProp) => void;
}

const PreviewImageAvatar: FC<PreviewImageAvatarProps> = ({
  image,
  removeImage,
}) => {
  const [preview, setPreview] = useState<string | undefined>();

  useEffect(() => {
    let filePreviewUrl: string | undefined;

    if ('imageUrl' in image && image.imageUrl) {
      // for exisiting images, we will have string url
      setPreview(image.imageUrl);
    } else if (image instanceof File) {
      // for newly uploaded file images we will create preview url
      filePreviewUrl = URL.createObjectURL(image);
      setPreview(filePreviewUrl);
    }

    return () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
      }
    };
  }, [image]);

  const handleRemoveImage = () => {
    if (removeImage) {
      removeImage(image);
    }
  };

  return (
    <Badge
      badgeContent={
        removeImage && (
          <CloseOutlinedIcon
            sx={{ cursor: 'pointer' }}
            htmlColor={'red'}
            onClick={handleRemoveImage}
          />
        )
      }
    >
      <Avatar
        alt='Product preview'
        src={preview}
        sx={{ width: 90, height: 90 }}
      />
    </Badge>
  );
};

export default PreviewImageAvatar;
