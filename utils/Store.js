import { create } from 'zustand';
import Cookies from 'js-cookie';

const menuStore = create((set) => {
  const menu = Cookies.get('menu')
    ? JSON.parse(Cookies.get('menu'))
    : { activeMenu: true, screenSize: undefined };

  return {
    menu,

    setActiveMenu: (newMenu) =>
      set((state) => {
        return { ...state, menu: { ...state.menu, activeMenu: newMenu } };
      }),

    setScreenSize: (screenSize) => {
      set((state) => {
        return { ...state, menu: { ...state.menu, screenSize } };
      });
    },
  };
});

export default menuStore;
