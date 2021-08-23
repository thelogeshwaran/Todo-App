import { TodoStore } from "./Store";

export const setupRootStore = () =>{
    const rootTree = TodoStore.create({
        todos : [ ],
        sort : "None",
        filter : "All"
    })

    return { rootTree }
}