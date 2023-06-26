import { privateApi } from "./index";

export const toDoListItemApiMixin = {
  methods: {
    async list() {
      return await privateApi.get("/items");
    },
    async addListItem(payload) {
      const res = await privateApi.post("/items/new", payload);
      return res;
    },
    async viewListItem(id) {
      const res = await privateApi.get(`/items/${id}`);
      return res;
    },
    async uptListItem(id, payload) {
      const res = await privateApi.patch(`/item/${id}`, payload);
      return res;
    },

    async delListItem(id) {
      const res = await privateApi.delete(`/item/${id}`);
      return res;
    },
  },
};
