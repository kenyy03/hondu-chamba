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

export default function AccountMenu({ userInfo }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await router.push('/');
    dispatch(setUserInfo({}));
  }

  const handleNavigateToMyAccount = () => {
    router.push('/myaccount');
  }

  return (
    <div>
      <Menu>
        <MenuButton as={IconButton} >
          <Avatar 
            alt={`image-profile-${userInfo?.names}-${userInfo?.lastNames}`} 
            src={userInfo?.imageProfile?.url ?? ''}
          />
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
