import { useState } from 'react';
import ProgressContext from './ProgressContext';

const ProgressProvider = (props) => {
    
    const [progress, setProgress] = useState(0);

    return (
        <ProgressContext.Provider value={{ progress, setProgress }}>
            { props.children }
        </ProgressContext.Provider>
    );

};

export default ProgressProvider;