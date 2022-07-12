import CommentDetail from "./components/CommentDetail";
import ApprovalCard from "./components/ApprovalCard";

const UserPage = () => {

  return (
    <div>
      <ApprovalCard>
        <CommentDetail
          author="Sam"
          content="Nice blog!"
        />
      </ApprovalCard>
    </div>
  );
};

export default UserPage;
