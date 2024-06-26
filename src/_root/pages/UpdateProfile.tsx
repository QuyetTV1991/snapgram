import ProfileForm from "@/components/forms/ProfileForm";
import Loader from "@/components/shared/Loader";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import { useParams } from "react-router-dom";

const UpdateProfile = () => {
  const { id } = useParams();

  const { data: userProfile } = useGetUserById(id || "");

  if (!userProfile) {
    return <Loader />;
  }
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/edit.svg"
            alt="edit"
            width={36}
            height={36}
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>

        <ProfileForm userProfile={userProfile} />
      </div>
    </div>
  );
};

export default UpdateProfile;
