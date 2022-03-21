import StoreListItem from "../components/StoreListItem";

export default {
  title: "Loyaltree/StoreListItem",
  component: StoreListItem,
};

const storeItem = {
  id: 7,
  owner_id: 2,
  name: "The Leaky Cauldron",
  category: "Restaurant",
  description: "Local watering hole",
  photo_url:
    "https://images.pexels.com/photos/1267360/pexels-photo-1267360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  address: "2923 Alder ave",
  created_at: "2022-03-18T18:20:29.973Z",
  edited_at: "2022-03-18T18:20:29.973Z",
};

export const primary = (props) => {
  const { name, category, description, photo_url, address } = storeItem;
  return (
    <StoreListItem
      storeName={name}
      category={category}
      description={description}
      photo={photo_url}
      address={address}
    />
  );
};
