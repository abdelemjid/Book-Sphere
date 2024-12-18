import { useParams } from "react-router";

const EditBook = () => {
  const params = useParams();
  console.log(params.id);

  return (
    <div>
      <div>{params.id}</div>
    </div>
  );
};

export default EditBook;
