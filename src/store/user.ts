import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
  state: () => ({
    token: "111"
  }),
  getters: {
    getToken: (state) => {
      return state.token
    }
  }
})