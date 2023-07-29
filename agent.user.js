// ==UserScript==
// @author              tunmenee
// @id                  agent-opener
// @name                Open Agent Profile
// @category Misc
// @version 1.0
// @namespace none
// @description Click on agent name to open it in the game.
// @include https://intel.ingress.com/intel*
// @match https://intel.ingress.com/intel*
// @grant none
// ==/UserScript==

function wrapper(plugin_info) {
    if (typeof window.plugin !== 'function') window.plugin = function () { };
    plugin_info.buildName = 'agent-opener';
    plugin_info.dateTimeVersion = '1';
    plugin_info.pluginId = 'agent-opener';

    function setup() {
        //for every class "nickname" in whole document, prevent other js from running   $(document).on('click', '.nickname', function(event)
        $(document).on('click', '.nickname', function (event) {
            //show alert to ask if user wants to open agent profile
            if (confirm("Open " + $(this).text() + "'s profile?\n\n(Called by Agent Opener plugin)")) {
                //get agent name from the class "nickname"
                var agentName = $(this).text();
                //open agent profile in game https://link.ingress.com/?link=https://intel.ingress.com/agent/nickname
                window.open("https://link.ingress.com/?link=https://intel.ingress.com/agent/" + agentName, "_blank");
            } else {
                //do nothing
            }
        });
    }



    setup.info = plugin_info;
    if (!window.bootPlugins) window.bootPlugins = [];
    window.bootPlugins.push(setup);
    if (window.iitcLoaded && typeof setup === 'function') setup();
}

var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) {
    info.script = {
        version: GM_info.script.version,
        name: GM_info.script.name,
        description: GM_info.script.description
    };
}
var textContent = document.createTextNode('(' + wrapper + ')(' + JSON.stringify(info) + ')');
script.appendChild(textContent);
(document.body || document.head || document.documentElement).appendChild(script);