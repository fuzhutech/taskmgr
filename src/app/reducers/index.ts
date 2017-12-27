import {NgModule} from '@angular/core';
/**
 * combineReducers 接收一系列的 reducer 作为参数，然后创建一个新的 reducer
 * 这个新的 reducer 接收到各 reducer 的值后，按 reducer 的 key 进行存储。
 * 把这个新的 reducer 想象成一个数据库，各个子 reducer 就像数据库中的表。
 *
 */
import {ActionReducer, combineReducers, StoreModule, Action} from '@ngrx/store';
import {StoreRouterConnectingModule, routerReducer} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

/**
 * compose 函数是一个很方便的工具，简单来说，它接受任意数量的函数作为参数，然后返回一个新的函数。
 * 这个新的函数其实就是前面的函数的叠加，比如说，我们给出 `compose(f(x), g(x))`, 返回的新函数
 * 就是 `g(f(x))`。
 */
import {compose} from '@ngrx/core/compose';
/**
 * storeFreeze 用于防止 state 被修改，在 Redux 中我们必须确保 state 是不可更改的，这个函数
 * 有助于帮我们检测 state 是否被有意或无意的修改了。当 state 发生修改时，会抛出一个异常，这一点
 * 在开发时非常有帮助。根据环境变量的值，发布时会不包含这个函数。
 */
import {storeFreeze} from 'ngrx-store-freeze';


import * as fromRouter from '@ngrx/router-store';
import * as fromQuote from './quote.reducer';
import {environment} from '../../environments/environment';

/**
 * 正如我们的 reducer 像数据库中的表一样，我们的顶层 state 也包含各个子 reducer 的 state
 * 并且使用一个 key 来标识各个子 state
 */
export interface State {
    quote: fromQuote.State;
    // router: fromRouter.RouterReducerState;
}

const initState = {
    quote: fromQuote.initialState,
    // router:
};

const reducers = {
    // router: routerReducer,
    quote: fromQuote.reducer,
};

/**
 * 使用 combineReducers 把所有子 reducer 合并产生一个顶级 reducer
 */

/**
 combineReducers
 随着应用变得复杂，需要对 reducer 函数 进行拆分，拆分后的每一块独立负责管理 state 的一部分。

 combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这
 个 reducer 调用 createStore。

 合并后的 reducer 可以调用各个子 reducer，并把它们的结果合并成一个 state 对象。state 对象的结构由传入的多个 reducer 的 key 决定。

 通过为传入对象的 reducer 命名不同来控制 state key 的命名。例如，你可以调用
 combineReducers({todos: myTodosReducer, counter: myCounterReducer }) 将 state 结构变为 { todos, counter }。

 通常的做法是命名 reducer，然后 state 再去分割那些信息，因此你可以使用 ES6 的简写方法：combineReducers({ counter, todos })。
 这与 combineReducers({ counter: counter, todos: todos })一样。

 http://www.redux.org.cn/docs/api/combineReducers.html
 */



const productionReducer: ActionReducer<State, Action> = combineReducers(reducers);
// const developmentReducer: ActionReducer<State, Action> = combineReducers(storeFreeze(reducers));
// const developmentReducer: ActionReducer<State, Action> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state = initState, action: any) {
    if (environment.production) {
        return productionReducer(state, action);
    } else {
        // return developmentReducer(state, action);
    }
}

@NgModule({
    imports: [
        /**
         * StoreModule.provideStore  仅需引入一次，请把它包含在根模块或者 CoreModule 中
         * 我们这里为了方便组织，新建了一个 AppStoreModule，但也是只在 CoreModule 中引入的
         */
        StoreModule.forRoot(reducers),
        StoreRouterConnectingModule,
        // DevTool 需要在 StoreModule 之后导入
        StoreDevtoolsModule.instrument({
            maxAge: 25 //  Retains last 25 states
        })
    ]
})
export class AppStoreModule {
}
