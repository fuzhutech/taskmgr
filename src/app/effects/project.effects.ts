import {Injectable} from '@angular/core';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {of} from 'rxjs/observable/of';
import {ProjectService} from '../services';
import * as actions from '../actions/project.action';
import * as tasklistActions from '../actions/task-list.action';
import * as userActions from '../actions/user.action';
import * as fromRoot from '../reducers';
import {Project} from '../domain';

@Injectable()
export class ProjectEffects {

    /**
     *
     */
    @Effect()
    loadProjects$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.LOADS)
        .map((action: actions.LoadProjectsAction) => action.payload)
        .withLatestFrom(this.store$.select(fromRoot.getAuth))
        .switchMap(([_, auth]) => this.service
            .get(auth.user.id)
            .map(projects => new actions.LoadProjectsSuccessAction(projects))
            .catch(err => of(new actions.LoadProjectsFailAction(JSON.stringify(err))))
        );

    @Effect()
    addProject$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.ADD)
        .map((action: actions.AddProjectAction) => action.payload)
        .withLatestFrom(this.store$.select(fromRoot.getAuth))
        .switchMap(([project, auth]) => {
                const added = {...project, members: [`${auth.user.id}`]};
                return this.service
                    .add(added)
                    .map(returned => new actions.AddProjectSuccessAction(returned))
                    .catch(err => of(new actions.AddProjectFailAction(JSON.stringify(err))));
            }
        );

    @Effect()
    updateProject$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.UPDATE)
        .map((action: actions.UpdateProjectAction) => action.payload)
        .switchMap(project => this.service
            .update(project)
            .map(returned => new actions.UpdateProjectSuccessAction(returned))
            .catch(err => of(new actions.UpdateProjectFailAction(JSON.stringify(err))))
        );

    @Effect()
    updateLists$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.UPDATE_LISTS)
        .map((action: actions.UpdateListsAction) => action.payload)
        .switchMap(project => this.service
            .updateTaskLists(project)
            .map(returned => new actions.UpdateListsSuccessAction(returned))
            .catch(err => of(new actions.UpdateListsFailAction(JSON.stringify(err))))
        );

    @Effect()
    removeProject$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.DELETE)
        .map((action: actions.DeleteProjectAction) => action.payload)
        .switchMap(project => this.service
            .del(project)
            .map(returned => new actions.DeleteProjectSuccessAction(returned))
            .catch(err => of(new actions.DeleteProjectFailAction(JSON.stringify(err))))
        );

    @Effect({dispatch: false})
    selectProject$ /*: Observable<Action>*/ = this.actions$
        .ofType(actions.ActionTypes.SELECT)
        .map((action: actions.SelectProjectAction) => action.payload)
        .map(project => this.router.navigate([`/tasklists/${project.id}`]));

    @Effect()
    loadTaskLists$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.SELECT)
        .map((action: actions.SelectProjectAction) => action.payload)
        .map(project => new tasklistActions.LoadTaskListsAction(project.id));

    @Effect()
    toLoadUsersByPrj$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.SELECT)
        .map((action: actions.SelectProjectAction) => action.payload)
        .map(project => new userActions.LoadUsersByPrjAction(project.id));

    @Effect()
    startInitTaskLists$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.ADD_SUCCESS)
        .map((action: actions.AddProjectSuccessAction) => action.payload)
        .map(project => new tasklistActions.InitTaskListsAction(project));

    @Effect()
    addUserPrjRef$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.ADD_SUCCESS)
        .map((action: actions.AddProjectSuccessAction) => action.payload)
        .map((prj: Project) => prj.id)
        .withLatestFrom(this.store$.select(fromRoot.getAuth).map(auth => auth.user), (projectId, user) => {
            return new userActions.AddUserProjectAction({user: user, projectId: projectId});
        });

    @Effect()
    delUserPrjRef$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.DELETE_SUCCESS)
        .map((action: actions.DeleteProjectSuccessAction) => action.payload)
        .map((prj: Project) => prj.id)
        .withLatestFrom(this.store$.select(fromRoot.getAuth).map(auth => auth.user), (projectId, user) => {
            return new userActions.RemoveUserProjectAction({user: user, projectId: projectId});
        });

    @Effect()
    inviteMembersRef$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.INVITE)
        .map((action: actions.InviteMembersAction) => action.payload)
        .switchMap(({projectId, members}) =>
            this.service.inviteMembers(projectId, members)
                .map((project: Project) => new actions.InviteMembersSuccessAction(project))
                .catch(err => of(new actions.InviteMembersFailAction(err)))
        );

    @Effect()
    updateUserPrjRef$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.INVITE_SUCCESS)
        .map((action: actions.InviteMembersSuccessAction) => action.payload)
        .map((project: Project) => new userActions.BatchUpdateUserProjectAction(project));

    /**
     *
     * @param actions$ action 流
     * @param service  注入 ProjectService
     * @param store$ 注入 redux store
     */
    constructor(private actions$: Actions,
                private service: ProjectService,
                private store$: Store<fromRoot.State>,
                private router: Router) {
    }
}
