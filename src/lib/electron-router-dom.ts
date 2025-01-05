import { createElectronRouter } from './electron-router'

interface ImportMeta {
  env?: {
    VITE_DEV_SERVER_URL?: string;
  };
}
 
export const { Router, registerRoute, settings } = createElectronRouter({
  devServerUrl: (import.meta as unknown as ImportMeta).env?.VITE_DEV_SERVER_URL,
  types: {
    /**
     * The ids of the windows of your application, think of these ids as the basenames of the routes
     * this new way will allow your editor's intelisense to help you know which ids are available to use
     * both in the main and renderer process
     */
    ids: ['main', 'about'],
  },
})