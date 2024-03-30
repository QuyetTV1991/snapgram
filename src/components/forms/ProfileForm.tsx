import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProfileValidation } from "@/lib/validation";
import { Textarea } from "../ui/textarea";
import ProfileUploader from "../shared/ProfileUploader";
import Loader from "../shared/Loader";
import { useUpdateUser } from "@/lib/react-query/queriesAndMutations";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

type ProfileFormProps = {
  userProfile?: Models.Document;
};

const ProfileForm = ({ userProfile }: ProfileFormProps) => {
  if (!userProfile) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const [profile, setProfile] = useState(userProfile);
  const { mutateAsync: updateUser, isPending: isLoadingUpdate } =
    useUpdateUser();

  // 1.Define your form.
  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: profile.name,
      username: profile.username,
      email: profile.email,
      bio: profile.bio || "",
    },
  });

  //   2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ProfileValidation>) {
    const updatedUser = await updateUser({
      userId: profile.$id,
      name: values.name,
      bio: values.bio,
      file: values.file,
      imageUrl: profile.imageUrl,
      imageId: profile.imageId,
    });

    if (!updatedUser) {
      return toast({
        title: "Update user failed. Please try again.",
      });
    }

    setProfile({
      ...profile,
      name: updatedUser?.name,
      bio: updatedUser?.bio,
      imageUrl: updatedUser?.imageUrl,
    });

    setUser({
      ...user,
      name: updatedUser?.name,
      bio: updatedUser?.bio,
      imageUrl: updatedUser?.imageUrl,
    });

    return navigate(`/profile/${profile.$id}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="flex">
              <FormControl>
                <ProfileUploader
                  fieldChange={field.onChange}
                  mediaUrl={profile.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} disabled />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  className="shad-input"
                  {...field}
                  disabled
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Bio</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingUpdate}
          >
            {isLoadingUpdate && <Loader />}
            Update Profile
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
