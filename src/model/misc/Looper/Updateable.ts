export interface Updateable {
    readonly id: number;
    update: (elapsedTime: number) => void;
}
