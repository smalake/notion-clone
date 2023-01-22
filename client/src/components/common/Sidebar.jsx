import {
  Drawer,
  List,
  ListItemButton,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import assets from "../../assets/index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  // ページ遷移用
  const navigate = useNavigate();
  // reduxでユーザ情報を取得
  const user = useSelector((state) => state.user.value);

  // ログアウトボタンをクリックしたら、JWTを削除してログインページへリダイレクト
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: "100vh" }}
    >
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
            <IconButton></IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton>
              <AddCircleOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        <ListItemButton sx={{ pl: "20px" }} component={Link} to="/memo/1234">
          <Typography>📝 仮置のメモ</Typography>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
