import { uiModules } from 'ui/modules';
import { Notifier } from 'ui/notify/notifier';
import routes from 'ui/routes';

import template from './watcher_raw_edit.html';
import controller from './watcher_raw_edit';

routes
  .when('/watcher/raw/:id/edit')
  .when('/watcher/raw/:type/new')
  .defaults(/watcher\/raw\/(:id\/edit|:type\/new)/, {
    template,
    controller,
    controllerAs: 'watcherRawEdit',
    bindToController: true,
    resolve: {
      watcher: function ($injector) {
        const $route = $injector.get('$route');
        const kbnUrl = $injector.get('kbnUrl');
        const watcherService = $injector.get('Watcher');
        const notifier = new Notifier({ location: 'Watcher' });

        const watcherId = $route.current.params.id;

        if (!watcherId) {
          return watcherService.new('watcher').catch(function (err) {
            notifier.error(err);
            kbnUrl.redirect('/');
          });
        }

        return watcherService.get(watcherId).catch(function (err) {
          notifier.error(err);
          kbnUrl.redirect('/');
        });
      },
    },
  });