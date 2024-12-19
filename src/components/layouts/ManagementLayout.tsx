import Box from "@mui/material/Box";

import { useSelector } from "@/providers/store/hooks";
import { selectUser } from "@/providers/store/features/user/userSlice";
import { useGetSellerShopQuery } from "@/providers/store/services/shops";
import { UserRoles } from "@/providers/store/services/types/users";
import Header from "./header/Header";

const ManagementLayout = () => {
  const user = useSelector(selectUser);

  // load seller's shop info needed for the routes shop status check
  useGetSellerShopQuery(undefined, { skip: user?.role !== UserRoles.SELLER });

  return (
    <Box>
      <Header shouldRenderSidebar={true} />
    </Box>
  );
};

export default ManagementLayout;
