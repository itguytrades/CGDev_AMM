import { createSlice } from '@reduxjs/toolkit'

export const amm = createSlice({
  name: 'amm',
  initialState: {
    contract: null,
    shares: 0,
    swaps: [],
    depositing: {
      isDepositing: false,
      isSucccess: false,
      transactionHash: null
    },
    withdrawing: {
      isWithdrawing: false,
      isSucccess: false,
      transactionHash: null
    },
    swapping: {
      isSwapping: false,
      isSucccess: false,
      transactionHash: null
    }
  },
  reducers: {
    setContract: (state, action) => {
      state.contract = action.payload
    },
    sharesLoaded: (state, action) => {
      state.shares = action.payload
    },
    swapsLoaded: (state, action) => {
      state.swaps = action.payload
    },
    swapRequest: (state, action) => {
      state.swapping.isSwapping = true
      state.swapping.isSuccess = false
      state.swapping.transactionHash = null
    },
    swapSuccess: (state, action) => {
      state.swapping.isSwapping = false
      state.swapping.isSuccess = true
      state.swapping.transactionHash = action.payload
    },
    swapFail: (state, action) => {
      state.swapping.isSwapping = false
      state.swapping.isSuccess = false
      state.swapping.transactionHash = null
    }
  }
})

export const {
  setContract,
  sharesLoaded,
  swapsLoaded,
  swapRequest,
  swapSuccess,
  swapFail
} = amm.actions;

export default amm.reducer;