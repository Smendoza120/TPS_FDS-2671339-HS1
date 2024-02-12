import { CurrentWorkerDetailInterface } from "./current-worker-detail.interface"

export interface CurrentUserDetailInterface {
    firstName: string
    lastName: string
    email: string 
    oWorker: CurrentWorkerDetailInterface
}