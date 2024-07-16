import https from "./http-Pos";

class dataServiceInstance {
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
  GetCartItems(saasId, storeId, id) {
    return https.get(`/price-check/getcart/${saasId}/${storeId}/${id}`);
  }
  AddItemsToCart(item, saasId, storeId, id) {
    return https.post(
      `/price-check/addproduct/${saasId}/${storeId}/${id}`,
      item
    );
  }
  DeleteItemsFromCart(saasId, storeId, id, itemid) {
    return https.delete(
      `/price-check/deleteproduct/${saasId}/${storeId}/${id}/${itemid}`
    );
  }
  DeleteAllItemsFromCart(saasId, storeId, id) {
    return https.delete(
      `price-check/delete-all-products/${saasId}/${storeId}/${id}`
    );
  }
  OrderHistory(saasId, storeId, id) {
    return https.get(`order/view-order-detail-app/${storeId}/${saasId}/${id}`);
  }
  CreateOrder(data) {
    return https.post(`/order/create/order/master`, data);
  }
  SaveAddress(data, id) {
    return https.post(`customer/create-address/${id}`, data);
  }
  GetSavedAddress(id, saasId, storeId) {
    return https.get(
      `customer/get-all-customer-address-app/${id}/${saasId}/${storeId}`
    );
  }
}
const DataService = new dataServiceInstance();
export default DataService;
