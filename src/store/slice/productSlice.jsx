import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Hàm fetchProducts lấy danh sách sản phẩm từ API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(
      "https://6765989a410f849996559d9d.mockapi.io/api/shoes/man/product"
    );
    return response.json();
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    shoesMan: [], // Danh mục giày nam
    shoesWoman: [], // Danh mục giày nữ
    bags: [], // Danh mục túi
    loading: false,
    error: null,
    selectedProduct: null,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        // Dữ liệu trả về từ API
        const data = action.payload[0]; // Lấy phần tử đầu tiên từ mảng

        state.shoesMan = data["shoes-man"];
        state.shoesWoman = data["shoes-woman"];
        state.bags = data["bags"];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
