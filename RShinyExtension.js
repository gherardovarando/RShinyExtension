/**
 * @author : gherardo varando (gherardo.varando@gmail.com)
 *
 * @license: GPL v3
 *     This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
 */

"use strict";

const path = require('path');
const {
    spawn,
    ChildProcess
} = require('child_process');
const {
    dialog
} = require('electron').remote;
const {
    GuiExtension,
    ToggleElement,
    util
} = require('electrongui');

class RShinyExtension extends GuiExtension {

    constructor() {
        super({
            image: path.join(__dirname, "res", "img", "icon.png"), // not working
            menuLabel: 'RShiny',
            menuTemplate: [{
                label: 'Open shiny app',
                click: () => {
                    this.openShinyApp();
                }
            }]
        });
    }

    activate() {
        this.appendMenu();
        super.activate();
        this.webview = new ToggleElement(document.createElement('webview'));
        this.webview.element.classList.add('padded');
        this.webview.element.autosize = 'on';
        this.webview.element.style.width = '100%';
        this.webview.element.style.height = '100%';
        this.appendChild(this.webview);
    }

    deactivate() {
        util.empty(this.element, this.element.firstChild);
        this.removeMenu();
        super.deactivate();

    }


    runScript(path) {
        if (this.proc instanceof ChildProcess) this.proc.kill;
        this.childProcess = spawn('R', ['-q','--slave','-f', path]);
        this.childProcess.stdout.setEncoding('utf8');
        window.addEventListener('beforeunload', (e) => {
                this.childProcess.kill();
        });
    }

    openShinyApp() {
        dialog.showOpenDialog({
            title: 'Choose a R script',
            filters: [{
                name: 'R script',
                extensions: ['r', 'R']
            }]
        }, (filenames) => {
            if (filenames) {
                if (filenames.length > 0) {
                    this.runScript(filenames[0]);
                    this.childProcess.stdout.on('data', (data) => {
                        this.webview.element.src = `http://${data}/`;
                        this.webview.show();
                        this.show();
                    });
                }
            }
        });
    }
}

module.exports = RShinyExtension;
