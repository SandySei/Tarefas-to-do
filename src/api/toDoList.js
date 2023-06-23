import { privateApi } from "./index";

export const toDoListApiMixin = {
  methods: {
    async list() {
      return await privateApi.get("/lists");
    },
  },
};
