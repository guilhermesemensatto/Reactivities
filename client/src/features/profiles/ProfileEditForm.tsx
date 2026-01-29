import { Box, Button, Typography } from "@mui/material";
import { useProfile } from "../../lib/hooks/useProfile";
import { useForm } from "react-hook-form";
import { editProfileSchema, type EditProfileSchema } from "../../lib/schemas/editProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../app/shared/components/TextInput";
import { useEffect } from "react";
import { useParams } from "react-router";

type Props = {
  setEditProfileMode: (editProfileMode: boolean) => void;
};

export default function ProfileEditForm({ setEditProfileMode }: Props) {
  const { id } = useParams();
  const { editProfile, profile } = useProfile(id);

  const { control, handleSubmit, reset, formState: { isDirty, isValid } } = useForm<EditProfileSchema>({
    mode: 'onTouched',
    resolver: zodResolver(editProfileSchema)
  });

  useEffect(() => {
    reset({
      displayName: profile?.displayName,
      bio: profile?.bio || ''
    });
  }, [profile, reset]);

  const onSubmit = (data: EditProfileSchema) => {
    editProfile.mutate(data, {
      onSuccess: () => setEditProfileMode(false)
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Typography variant="h4">Edit Profile</Typography>

      <TextInput
        label="Display Name"
        control={control}
        name="displayName"
      />

      <TextInput
        multiline
        rows={5}
        label="Add your bio"
        control={control}
        name="bio"
      />

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        disabled={!isValid || !isDirty || editProfile.isPending}
      >
        Update Profile
      </Button>
    </Box>
  );
}
