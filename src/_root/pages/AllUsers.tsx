import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";

const AllUsers = () => {
  const { toast } = useToast();
  const { data: creators, isPending: isLoading, isError } = useGetUsers();

  if (isError) {
    toast({
      title: "something went wrong",
    });

    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <div className="flex gap-2 items-center">
          <img
            src="/assets/icons/people.svg"
            alt="people"
            className="w-8 h-8 invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        </div>

        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {creators?.documents.map((creator) => (
              <li key={creator.$id} className="flex-1 w-full min-w-[200px]">
                <UserCard creator={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
