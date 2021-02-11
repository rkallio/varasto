import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { Switch, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selector as tokenSelector } from './auth.redux.js';

import { LoginPage } from './login-page.jsx';
import ItemPage from './item-page.jsx';

import ReactModal from 'react-modal';

import { useForm }  from 'react-hook-form';
import AddItem from './add-item.jsx';
import EditItem from './edit-item.jsx';
import Modal from './modal.jsx';

export default () => {
    return (
        <>
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <ProtectedRoute path="/items">
                    <ItemPage />
                </ProtectedRoute>
                <Route path="/">
                    <RootRedirect />
                </Route>
            </Switch>
            <Modal />
        </>
    );
}

const RootRedirect = () => {
    const token = useSelector(tokenSelector);
    const history = useHistory();

    useEffect(() => {
        if(token) {
            history.push('/items');
        } else {
            history.push('/login');
        }
    }, [token])

    return null;
}


const ProtectedRoute = (props) => {
    const history = useHistory();
    const token = useSelector(tokenSelector);
    useEffect(() => {
        if(!token) {
            history.push('/login');
        }
    }, [token]);

    const { children, ...rest } = props;

    return (
        <Route {...rest }>
               {
                   children
               }
        </Route>
    );
}

// import { nanoid } from 'nanoid';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Redirect,
//     useHistory,
//     Link
// } from 'react-router-dom';

// import * as fromcss from './app.module.css';

// import { formatDistanceToNow, parseISO } from 'date-fns';
// import { useForm } from 'react-hook-form';

// import { useSelector, useDispatch } from 'react-redux';

// const AddItem = (props) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const dispatch = useDispatch();
//     const { register, reset, handleSubmit } = useForm();

//     const open = () => setIsOpen(true);
//     const close = () => setIsOpen(false);

//     const onSubmit = async data => {
//         const result = await dispatch(postItem(data));
//         if(result.type === postItem.fulfilled.type) {
//             close();
//         }
//     }

//     if(isOpen === true) {
//         return (
//             <form
//                 className={fromcss.tableRow}
//                 onSubmit={handleSubmit(onSubmit)}
//             >
//                 <div className={fromcss.tableCell}>
//                     <input

//                         name="name"
//                         ref={register}
//                         placeholder="Name"
//                     />
//                 </div>
//                 <div className={fromcss.tableCell}>
//                     <input
//                         name="location"
//                         ref={register}
//                         placeholder="Location"
//                     />
//                 </div>
//                 <div className={fromcss.tableCell}>
//                     <input
//                         name="currentQuantity"
//                         ref={register}
//                         placeholder="Current quantity"
//                     />
//                 </div>
//                 <div className={fromcss.tableCell}>
//                     <input
//                         name="targetQuantity"
//                         ref={register}
//                         placeholder="Target quantity"
//                     />
//                 </div>
//                 <div className={fromcss.tableCell}>
//                 </div>
//                 <div className={fromcss.tableCell}>
//                     <input type="submit" />
//                     <button type="button" onClick={close}>Close</button>
//                 </div>
//             </form>
//         );
//     } else {
//         return <button onClick={open}>Add item</button>
//     }
// }

// const Time = ({iso}) => {
//     const timeToNow = iso => {
//         return formatDistanceToNow(parseISO(iso), {
//             includeSeconds: true,
//             addSuffix: true
//         });
//     }

//     const [relativeTime, setRelativeTime] = useState(timeToNow(iso));

//     useEffect(() => {
//         const timer = setInterval(
//             () => setRelativeTime(timeToNow(iso)),
//             5000
//         );
//         return () => clearInterval(timer);
//     }, []);

//     return (
//         <time dateTime={iso}>{relativeTime}</time>
//     );
// }

// const Item = ({id}) => {
//     const dispatch = useDispatch();
//     const item = useSelector(
//         state => itemSelector.selectById(state, id));
//     const [editMode, setEditMode] = useState(false);
//     const enableEditing = () => setEditMode(true);
//     const disableEditing = () => setEditMode(false);
//     const remove = () => dispatch(deleteItem(id));

//     if(editMode) {
//         return (
//             <ItemForm
//                 viewMode={disableEditing}
//                 item={item}
//                 remove={remove}
//             />
//         );
//     } else {
//         return (
//             <ItemView
//                 editMode={enableEditing}
//                 item={item}
//                 remove={remove}
//             />
//         );
//     }
// }

// const ItemView = ({item, editMode, remove}) => {
//     return (
//         <div className={fromcss.tableRow}>
//             <div className={fromcss.tableCell}>
//                 {item.name}
//             </div>
//             <div className={fromcss.tableCell}>
//                 {item.location}
//             </div>
//             <div className={fromcss.tableCell}>
//                 {item.currentQuantity}
//             </div>
//             <div className={fromcss.tableCell}>
//                 {item.targetQuantity}
//             </div>
//             <div className={fromcss.tableCell}>
//                 <Time iso={item.updatedAt} />
//             </div>
//             <div className={fromcss.tableCell}>
//                 <button onClick={editMode}>Edit</button>
//                 <button onClick={remove}>Remove</button>
//             </div>
//         </div>
//     );
// }

// const ItemForm = ({item, viewMode}) => {
//     const {register, handleSubmit} = useForm();
//     const dispatch = useDispatch();

//     const onSubmit = async data => {
//         const result = await dispatch(patchItem({
//             id: item.id,
//             data: data
//         }));
//         if(result.type === patchItem.fulfilled.type) {
//             viewMode();
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}
//               className={fromcss.tableRow}>
//             <div className={fromcss.tableCell}>
//                 <input
//                     ref={register}
//                     name="name"
//                     placeholder={item.name}
//                     defaultValue={item.name}
//                 />
//             </div>
//             <div className={fromcss.tableCell}>
//                 <input
//                     ref={register}
//                     name="location"
//                     placeholder={item.location}
//                     defaultValue={item.location}
//                 />
//             </div>
//             <div className={fromcss.tableCell}>
//                 <input
//                     ref={register}
//                     name="currentQuantity"
//                     placeholder={item.currentQuantity}
//                     defaultValue={item.currentQuantity}
//                     type="number"
//                 />
//             </div>
//             <div className={fromcss.tableCell}>
//                 <input
//                     ref={register}
//                     name="targetQuantity"
//                     placeholder={item.targetQuantity}
//                     defaultValue={item.targetQuantity}
//                     type="number"
//                 />
//             </div>
//             <div className={fromcss.tableCell}>
//                 <Time iso={item.updatedAt} />
//             </div>
//             <div className={fromcss.tableCell}>
//                 <input
//                     type="submit" />
//                 <button
//                     type="button"
//                     onClick={viewMode}>
//                     Cancel
//                 </button>
//             </div>
//         </form>
//     );
// }

// console.log(authSlice);
// const ItemTable = (props) => {
//     const dispatch = useDispatch();
//     const ids = useSelector(state => itemSelector.selectIds(state));
//     useEffect(() => {
//         dispatch(findAllItems());
//     }, []);

//     return (
//         <div className={fromcss.table}>
//             {
//                 ids.map(id => <Item id={id} key={id} />)
//             }
//             <AddItem />
//         </div>
//     );
// };

// const ProtectedRoute = (props) => {
//     const history = useHistory();
//     const logged = useSelector(state => state.auth.signed);

//     useEffect(() => {
//         if(!logged) {
//             history.push('/login');
//         }
//     }, [logged]);

//     return (
//         <Route {...props}>
//             {
//                 props.children
//             }
//         </Route>
//     );
// }

// const App = () => (
//         <Router>
//             <Switch>
//                 <Route path="/login">
//                     <Login />
//                 </Route>
//                 <ProtectedRoute path="/items">
//                     <ItemTable />
//                 </ProtectedRoute>
//                 <ProtectedRoute path="/">
//                     <ItemTable />
//                 </ProtectedRoute>
//             </Switch>
//         </Router>
// );

// export default App;
