import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
import notionLogo from "../../assets/images/notion-logo.png";
import { useEffect } from "react";
import authUtils from "../../utils/authUtils";
import Sidebar from "../common/Sidebar";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ページ遷移が発生するたびに実行される
  useEffect(() => {
    // JWTを持っているのか確認
    const checkAuth = async () => {
      // 認証チェック
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
      } else {
        // ユーザを保存する
        dispatch(setUser(user));
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default AppLayout;
