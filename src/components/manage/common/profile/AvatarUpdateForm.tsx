import { type FC } from "react";
import { SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { useForm } from "@/components/form/hooks/useForm";
import ImagesFieldAdapter from "@/components/form/fields/ImagesFieldAdapter";
import PreviewImageAvatar from "@/components/common/images/PreviewImageAvatar";
import { AppImage } from "@/providers/store/services/types/common";
import { resizeImage } from "@/utils/resizeImage";
import { schema, AvatarUpdateFormData } from "./avatarUpdateForm.schema";

interface AvatarUpdateFormProps {
  updateAvatar: (formData: FormData, successCb: () => void) => void;
  isSubmitting: boolean;
}

const AvatarUpdateForm: FC<AvatarUpdateFormProps> = ({
  updateAvatar,
  isSubmitting,
}) => {
  const form = useForm<AvatarUpdateFormData>({
    schema,
    defaultValues: { avatarImage: [] },
  });

  const onSubmit: SubmitHandler<AvatarUpdateFormData> = async (values) => {
    if (!values.avatarImage || values.avatarImage.length === 0) {
      throw new Error("No image provided");
    }

    const file = values.avatarImage[0];

    if (!(file instanceof File)) {
      throw new Error("Invalid file type");
    }

    const formData = new FormData();

    const resizedImage = await resizeImage(file, {
      maxWidth: 300,
      maxHeight: 300,
      compressFormat: "png",
      outputType: "file",
    });

    formData.append("avatarImage", resizedImage);

    const formSuccessCb = (): void => {
      form.reset();
    };

    updateAvatar(formData, formSuccessCb);
  };

  const selectedFormImage = form.watch("avatarImage") as Array<File | AppImage>;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <ImagesFieldAdapter
        control={form.control}
        setError={form.setError}
        clearErrors={form.clearErrors}
        name="avatarImage"
        maxFiles={1}
      />

      <Stack
        sx={{ marginTop: 3 }}
        spacing={2}
        direction="row"
        justifyContent="center"
      >
        {selectedFormImage.map((formImage, index) => {
          if (!formImage) {
            return null;
          }

          const imageKey =
            "imageUrl" in formImage ? formImage.imageUrl : `file-${index}`;

          return (
            <PreviewImageAvatar key={imageKey as string} image={formImage} />
          );
        })}
      </Stack>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          type="button"
          disabled={isSubmitting}
          onClick={() => form.reset()}
          sx={{
            width: "40%",
            backgroundColor: "grey.100",
            color: "secondary.main",
            "&:hover": {
              backgroundColor: "grey.300",
              color: "secondary.dark",
            },
          }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={isSubmitting}
          sx={{
            width: "50%",
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Update Avatar
        </Button>
      </Box>
    </form>
  );
};

export default AvatarUpdateForm;
