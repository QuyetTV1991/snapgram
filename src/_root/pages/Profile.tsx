import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import LikedPosts from "./LikedPosts";

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
  const { pathname } = useLocation();
  const { id } = useParams();
  const { user: currentUser } = useUserContext();

  const { data: userProfile } = useGetUserById(id || "");

  console.log({ currentUser });
  console.log({ userProfile });

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
                <h1 className="h3-bold md:h1-bold text-center md:text-left">
                  {userProfile.name}
                </h1>
                <p className="small-regular md:body-medium text-light-3 text-center md:text-left">
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
                  <Link
                    to={`/update-profile/${userProfile.$id}`}
                    className="flex-center gap-2 rounded-lg h-12 bg-dark-4 px-5 text-light-1"
                  >
                    <img
                      src="/assets/icons/edit.svg"
                      alt="Edit"
                      width={20}
                      height={20}
                    />
                    <p className="flex whitespace-normal small-medium">
                      Edit Profile
                    </p>
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
      {/* Filter */}
      <div className="profile-inner_container">
        <div className="flex w-full justify-between gap-4">
          <div className="flex gap-4">
            <Link
              to={`/profile/${id}`}
              className={`profile-tab rounded-lg ${
                pathname === `/profile/${id}` && "!bg-dark-3"
              }`}
            >
              <img
                src={"/assets/icons/posts.svg"}
                alt="posts"
                width={20}
                height={20}
              />
              Posts
            </Link>
            {userProfile.$id === currentUser.id && (
              <Link
                to={`/profile/${id}/liked-posts`}
                className={`profile-tab rounded-lg ${
                  pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
                }`}
              >
                <img
                  src={"/assets/icons/like.svg"}
                  alt="like"
                  width={20}
                  height={20}
                />
                Liked Posts
              </Link>
            )}
          </div>
        </div>

        <div className="flex-center gap-3 rounded-xl bg-dark-3 px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>
      {/* Post Section */}
      <Routes>
        <Route
          index
          element={<GridPostList posts={userProfile.posts} showUser={false} />}
        />
        {userProfile.$id === currentUser.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
