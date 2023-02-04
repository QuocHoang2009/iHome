import axios from "axios";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from 'react-router-dom';
import { setCurrentHome, setHomes } from '../app/state';
import DefaultLayout from '../components/DefaultLayout';
import { getAllHomes } from '../const/API';
import sidebarItems from '../const/sidebarItems';

const Pages = ()=>{
    const user = useSelector((state) => state.user);
    const apiGetHomes = getAllHomes +  user._id;
    const dispatch = useDispatch();

    useEffect(()=>{
        (async () => {
            const res = await axios.get(apiGetHomes);
            if (res?.data) {
                dispatch(setHomes({homes: res.data}));
                dispatch(setCurrentHome({currentHome: res.data[0]}));
            }
        })();
    }, [apiGetHomes, dispatch]);

    return (
        <Routes>
            {sidebarItems.map((item, key) => {
                let Page = item.component;
                return (
                    <Route key={key} path={`${item.path}/*`}
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