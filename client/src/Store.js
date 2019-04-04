import { applyMiddleware, compose, createStore } from 'redux';
import ThunkMiddleware from 'redux-thunk';
// import { Request as RequestMiddleware } from './middlewares/Request';
import { Root as rootReducer } from './reducers/Root';

export class Store {
  static store;

  static initialize() {
    if (!this.store) {
      const composeEnhancers = process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        : compose
      ;

      this.store = createStore(
        rootReducer,
        composeEnhancers(
          applyMiddleware(ThunkMiddleware),
          // applyMiddleware(RequestMiddleware)
        )
      );
    }

    return this.store;
  }
}
