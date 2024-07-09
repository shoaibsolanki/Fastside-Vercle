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
  GetCartItems(id) {
    return https.get(`/price-check/getcart/1/10001/${id}`);
  }
  AddItemsToCart(item, id) {
    return https.post(`/price-check/addproduct/1/10001/${id}`, item);
  }
  DeleteItemsFromCart(id, itemid) {
    return https.delete(`/price-check/deleteproduct/1/10001/${id}/${itemid}`);
  }
  DeleteAllItemsFromCart(id) {
    return https.delete(`price-check/delete-all-products/1/10001/${id}`);
  }
  OrderHistory(id) {
    return https.get(`order/view-order-detail-app/1/10001/${id}`);
  }
  CreateOrder(data) {
    return https.post(`/order/create/order/master`, data);
  }
  SaveAddress(data, id) {
    return https.post(`customer/create-address/${id}`, data);
  }
  GetSavedAddress(id) {
    return https.get(`/customer/get-all-customer-address-app/${id}/1/10001`);
  }
}
export default new DataService();
