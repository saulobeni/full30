import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    useParams
} from "react-router-dom";

import Home from '@/pages/Home';
import AccountLinks from '@/pages/AccountLinks';
import Dashboard from '@/pages/Admin/Dashboard';
import CreateLink from "@/pages/Admin/CreateLink";
import Ui from "@/pages/Admin/Ui";
import Login from '@/pages/Login';
import PreviewContext from "./context/PreviewContext";

export default createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={ <Home /> }></Route>
            <Route path="/:accountlink" element={ <AccountLinks /> }></Route>
            <Route path="/login" element={ <Login /> }></Route>
            <Route path="/admin">
                <Route path="dashboard" element={ <Dashboard /> }></Route>
                <Route path="create-link" element={ <CreateLink /> }></Route>
                <Route path="ui" element={ 
                    <PreviewContext>
                        <Ui /> 
                    </PreviewContext>
                }></Route>
            </Route>
        </>
    )
)