import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      username: "wichogzf",
      password: "pendejo123",
      email: "wichogzf@gmail.com"
    }
  },

});
