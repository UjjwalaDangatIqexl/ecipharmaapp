import { jwtDecode } from "jwt-decode";

export const hasToken = () => {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  return token ? token : false;
};

export const hasRefreshToken = () => {
  let refreshToken = null;
  if (typeof window !== "undefined") {
    refreshToken = localStorage.getItem("refreshToken");
  }
  return refreshToken ? refreshToken : false;
};

export const saveToken = (token, refreshToken) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
};

export const clearToken = () => {
  localStorage.clear();
  window.location.href = "/";
};

export const getUserRole = () => {
  var token = hasToken();
  let decoded = null;
  if (token) {
    decoded = jwtDecode(token);
  }
  return decoded ? decoded.roles : null;
};

// export const user = (role, id) => {
//   let userObj = {
//     role: role,
//     id: id,
//     getRoleAndId: function () {
//       return `${this.role}_${this.id}`;
//     },
//   };

//   return userObj.getRoleAndId();
// };

// console.log(user("user", 1), "useruseruser");
// console.log(user("Admin", 2), "useruseruser");
