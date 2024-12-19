import { IItemsList } from './ItemsList.props';

const ItemsList = ({ children, className }: IItemsList) => {
    return (
        <ul className={className}>
            {children}
        </ul>
    );
}

export default ItemsList;