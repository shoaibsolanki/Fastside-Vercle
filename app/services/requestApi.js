import https from "./http-Pos";

class DataService {
  //Api For Port 8089 / 8088
  Login(data) {
    return https.post("auth/user-login", data);
  }
  Signup(data) {
    return https.post(`customer/create`, data);
  }

  GetAllCateogary(saasId, storeId) {
    return https.get(`category/get-list/${saasId}/${storeId}`);
  }
  GetDataByCatorya(saasId, storeId, category_name, currentPage) {
    return https.get(
      `item/get-category-list/${saasId}/${storeId}/${category_name}/${currentPage}`
    );
  }

  FetchProductApi(storeId, saasId, page) {
    return https.get(`/search/recommended-item/${storeId}/${saasId}/${page}`);
  }
  FetchSingleProduct(id) {
    return https.get(`/item/view-item-detil/${id}`);
  }
}
export default new DataService();