import { setUserInfo } from '@/redux/features/userSlice';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export default function AccountMenu() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(setUserInfo({}));
  }

  const handleNavigateToMyAccount = () => {
    router.push('/myaccount');
  }

  return (
    <div>
      <Menu>
        <MenuButton as={IconButton} >
          <Avatar />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleNavigateToMyAccount} >Mi cuenta</MenuItem>
          <MenuDivider />
          <MenuItem onClick={handleLogout} >Logout </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}
