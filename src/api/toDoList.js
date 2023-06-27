import { privateApi } from "./index";

export const toDoListApiMixin = {
  methods: {
    async list() {
      return await privateApi.get("/lists");
    },
    async addItem(payload) {
      const res = await privateApi.post("/lists/new", payload);
      return res;
    },
    async viewItem(id) {
      const res = await privateApi.get(`/lists/${id}`);
      return res;
    },
    async uptItem(id, payload) {
      const res = await privateApi.patch(`/lists/${id}`, payload);
      return res;
    },

    async delItem(id) {
      const res = await privateApi.delete(`/lists/${id}`);
      return res;
    },
  },
};
