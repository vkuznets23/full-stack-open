import axios from "axios";

const baseUrl = "/api/users";

const getAllUsers = async () => {
  try {
    const { data } = await axios.get(baseUrl);
    return data;
  } catch (error) {
    throw Error("Failed to fetch users");
  }
};

export default { getAllUsers };
