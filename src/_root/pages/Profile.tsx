import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import { Link, useParams } from "react-router-dom";

type BlockStatProps = {
  value: number;
  label: string;
};

const BlockStat = ({ value, label }: BlockStatProps) => {
  return (
    <div className="flex justify-start items-center gap-2 md:mt-2">
      <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
      <p className="small-medium lg:base-medium text-light-2">{label}</p>
    </div>
  );
};

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useUserContext();

  const { data: userProfile } = useGetUserById(id || "");

  if (!userProfile) return <Loader />;

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={userProfile.imageUrl}
            alt="user-profile"
            className="w-28 h-28 rounded-full lg:w-36 lg:h-36"
          />
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-10">
              <div className="flex flex-col flex-1 justify-between md:mt-2 w-full xl:text-left">
                <h1 className="h3-bold md:h1-bold text-center xl:text-left">
                  {userProfile.name}
                </h1>
                <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                  @{userProfile.username}
                </p>
                <div className="flex-center gap-4 mt-5">
                  <BlockStat value={userProfile.posts.length} label="Posts" />
                  <BlockStat value={20} label="Followers" />
                  <BlockStat value={20} label="Following" />
                </div>
              </div>
              <div className="flex justify-center gap-4 md:mt-5">
                {userProfile.$id === currentUser.id ? (
                  <Link to={`/update-profile/${userProfile.$id}`}>
                    <img
                      src="/assets/icons/edit.svg"
                      alt="Edit"
                      className="w-20 h-20"
                    />
                  </Link>
                ) : (
                  <Button type="button" className="shad-button_primary px-8">
                    Follow
                  </Button>
                )}
              </div>
            </div>
            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>
        </div>
      </div>
      Profile - {userProfile?.$id} || CurrentUser - {currentUser.id}
    </div>
  );
};

export default Profile;
