import CollectionCard from "./CollectionCard";
import {useProject} from "../../../shared/store/useProject";
const CollectionList = () => {
  const {collections, setCollections} = useProject();
  if (!collections.length) {
    return (
      <p className="text-gray-500 mt-10 text-center">
        No collections created yet.
      </p>
    );
  }
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-12">
      {collections.map((col) => (
        <CollectionCard
          col={col}
          key={col._id}
          setCollections={setCollections}
        />
      ))}
    </div>
  );
};

export default CollectionList;
