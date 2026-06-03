import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'teams',
        pathMatch: 'full',
    },

    {
        path: 'teams',
        loadComponent: () =>
            import('./features/teams/pages/teams-page/teams-page')
                .then(m => m.TeamsPage)
    },

    {
        path: 'matches',
        loadComponent: () =>
            import('./features/matches/pages/matches-page/matches-page')
                .then(m => m.MatchesPage)
    },
    {
        path: 'predictions/:id',
        loadComponent: () =>
            import(
                './features/predictions/pages/predictions-page/predictions-page'
            ).then(m => m.PredictionsPage)
    },
    {
        path: 'leaderboard',
        loadComponent: () =>
            import('./features/leaderboard/pages/leaderboard-page/leaderboard-page')
                .then(m => m.LeaderboardPage)
    }
];