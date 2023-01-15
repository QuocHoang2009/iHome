import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import sidebarItems from '../const/sidebarItems';

const Pages = ()=>{
    return (
        <Routes>
            {sidebarItems.map((item, key) => {
                let Page = item.component;
                return (
                    <Route key={key} path={item.path} 
                        element={
                        <DefaultLayout>
                            <Page />
                        </DefaultLayout>} 
                    />
                )       
            })}
        </Routes>
    );
}

export default Pages;