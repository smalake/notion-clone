import authApi from "../api/authApi";

const authUtils = {
  // JWTチェック
  isAuthenticated: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    try {
      // verify-tokenのAPIを呼び出してユーザ情報を取得する
      const res = await authApi.verifyToken();
      return res.user;
    } catch {
      return false;
    }
  },
};

export default authUtils;
