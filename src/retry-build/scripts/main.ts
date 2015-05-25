import {BuildHttpClient} from "TFS/Build/RestClient";
import {getCollectionClient} from "VSS/Service";
var retryBuildMenu = (function () {
    "use strict";

    return <IContributedMenuSource> {
        execute: (actionContext: any) => {
			var vsoContext = VSS.getWebContext();
			var buildClient = getCollectionClient(BuildHttpClient);

			VSS.ready(() => {
				// get the build
				buildClient.getBuild(actionContext.id, vsoContext.project.name).then(build => {
					// and queue it again
					buildClient.queueBuild(build, build.definition.project.id).then(newBuild => {
						// and navigate to the build summary page
						// e.g. https://myproject.visualstudio.com/DefaultCollection/someproject/_BuildvNext#_a=summary&buildId=1347
						var buildPageUrl = `${vsoContext.host.uri}/${vsoContext.project.name}/_BuildvNext#_a=summary&buildId=${newBuild.id}`;
						window.parent.location.href = buildPageUrl;
					});
				});
			});
        }
    };
}());

VSS.register("retryBuildMenu", retryBuildMenu);