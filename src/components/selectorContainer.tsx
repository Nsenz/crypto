import {observer} from 'mobx-react-lite';
import {SelectorProps} from '../types';
import {useMainStore} from '../mainStore';

export const SelectorContainer: React.FC<SelectorProps> = observer(({field, name, children}) => {
    const store = useMainStore();
    return(
        <div className="inpitem">
            <span>{name}</span>
            <select onChange={(e) => store[field] = e.target.value}>
                    {children}
            </select>
        </div>
    )
});
