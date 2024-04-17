import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type AppState = {
    actualPrincipal: string | null;
};

export type AppStateActions = {
    setActualPrincipal: (principal: string) => void;
};

export type AppStore = AppState & AppStateActions;

export const initAppStore = (): AppState => {
    return { actualPrincipal: null };
};

export const defaultInitState: AppState = {
    actualPrincipal: null,
};

export const createAppStore = (
    initState: AppState = defaultInitState,
) => {
    return createStore<AppStore>()(persist((set) => ({
        ...initState,
        setActualPrincipal: (principal: string) =>
            set(() => ({ actualPrincipal: principal })),
    }), {
        name: "appStore"
    })
    )
};
