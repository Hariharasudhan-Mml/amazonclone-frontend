import {createStore} from 'redux';
import  {Reducer} from './Reducers'

export const store=createStore(Reducer);
