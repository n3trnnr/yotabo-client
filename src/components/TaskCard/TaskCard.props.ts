export interface ITaskProps {
    id: string | number,
    tatle: string,
    description: string,
    proprity: string,
    deadline: number,
    files: number,
    handleDeleteTask: (id: string | number) => void
}