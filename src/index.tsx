import React from 'react';
import { createRoot } from 'react-dom/client';
import Tools from './tools';

//  挂载组件
const mountNode = document.getElementById('main');

const root = createRoot(mountNode); // createRoot(container!) if you use TypeScript

function render() {
    root.render(<Tools />);
}

render();
if (module.hot) {
    module.hot.accept('./tools', function() {
        console.log('hmr active!');
        render();
    })
}