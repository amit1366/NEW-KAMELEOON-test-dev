/* eslint-disable */
import App from './App';

const app = localStorage.getItem('kamdevState') && new App(2)