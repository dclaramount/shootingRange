import ReactDOM from 'react-dom';
import React from 'react';
import reactToWebComponent from 'react-to-webcomponent';
import { ThemeProvider } from '@mui/system';
import createCache from '@emotion/cache';
import { StyledEngineProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { CacheProvider } from '@emotion/react';
import { ProvidersProps } from './types';

export function ThemeProviders(props: ProvidersProps) {
  return (
    <StyledEngineProvider injectFirst={false}>
      <ThemeProvider theme={props.theme}>{props.children}</ThemeProvider>
    </StyledEngineProvider>
  );
}

/**
 * Web component wrapper that wrap the react component into a shadow dom web component
 * shadow dom is used to isolate your custom component from element styles
 */
export function WebComponentWrapper(
  NAME: string,
  Component: (props) => JSX.Element,
  CustomProviders: (props) => React.ReactElement<typeof ThemeProviders>
): void {
  class WebComponent extends reactToWebComponent(Component, React, ReactDOM) {
    props = {};

    //https://codesandbox.io/s/shadow-dom-rki9k5?from-embed=&file=/index.tsx:1159-1188
    connectedCallback() {
      const shadowRoot = super.attachShadow({ mode: 'open' });
      const mountPoint = document.createElement('span');
      const emotionRoot = document.createElement('style');

      const linkElem = document.createElement('link');
      linkElem.setAttribute('rel', 'stylesheet');
      linkElem.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/bw-bootstrap-strelnice.css?dummy=${new Date()}`);

      const linkElem2 = document.createElement('link');
      linkElem2.setAttribute('rel', 'stylesheet');
      linkElem2.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/bw-calendar.css?dummy=${new Date()}`);

      const linkElem3 = document.createElement('link');
      linkElem3.setAttribute('rel', 'stylesheet');
      linkElem3.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/bw-front-strelnice.css?dummy=${new Date()}`);

      const linkElem4 = document.createElement('link');
      linkElem4.setAttribute('rel', 'stylesheet');
      linkElem4.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/bw-print-strelnice.css?dummy=${new Date()}`);

      const linkElem5 = document.createElement('link');
      linkElem5.setAttribute('rel', 'stylesheet');
      linkElem5.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/bw-reboot-strelnice.css?dummy=${new Date()}`);

      const linkElem6 = document.createElement('link');
      linkElem6.setAttribute('rel', 'stylesheet');
      linkElem6.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/bw-reservation-strelnice.css?dummy=${new Date()}`);

      const linkElem7 = document.createElement('link');
      linkElem7.setAttribute('rel', 'stylesheet');
      linkElem7.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/bw-honest-week-picker.css?dummy=${new Date()}`);

      const linkElem8 = document.createElement('link');
      linkElem8.setAttribute('rel', 'stylesheet');
      linkElem8.setAttribute('href', `//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css?dummy=${new Date()}`);
      
      //DEV EXTREME
      const linkElem9 = document.createElement('link');
      linkElem9.setAttribute('rel', 'stylesheet');
      linkElem9.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/bw-dx-demo-template.css?dummy=${new Date()}`);

      const linkElem10 = document.createElement('link');
      linkElem10.setAttribute('rel', 'stylesheet');
      linkElem10.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/bw-dx-light.css?dummy=${new Date()}`);

      const linkElem11 = document.createElement('link');
      linkElem11.setAttribute('rel', 'stylesheet');
      linkElem11.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/bw-dx-material-blue-light.css?dummy=${new Date()}`);

      const linkElem12 = document.createElement('link');
      linkElem12.setAttribute('rel', 'stylesheet');
      linkElem12.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/bw-calendar-instructors.css?dummy=${new Date()}`);

      //CSS files for the plugin of calendar
      const linkElem13 = document.createElement('link');
      linkElem13.setAttribute('rel', 'stylesheet');
      linkElem13.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/ej2_react_schedule_material.css?dummy=${new Date()}`);

      const linkElem14 = document.createElement('link');
      linkElem14.setAttribute('rel', 'stylesheet');
      linkElem14.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/ej2_splitbuttons_material.css?dummy=${new Date()}`);
  
      const linkElem15 = document.createElement('link');
      linkElem15.setAttribute('rel', 'stylesheet');
      linkElem15.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/ej2_popups_material.css?dummy=${new Date()}`);

      const linkElem16 = document.createElement('link');
      linkElem16.setAttribute('rel', 'stylesheet');
      linkElem16.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/ej2_navigations_material.css?dummy=${new Date()}`);

      const linkElem17 = document.createElement('link');
      linkElem17.setAttribute('rel', 'stylesheet');
      linkElem17.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/ej2_lists_material.css?dummy=${new Date()}`);

      const linkElem18 = document.createElement('link');
      linkElem18.setAttribute('rel', 'stylesheet');
      linkElem18.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/ej2_inputs_material.css?dummy=${new Date()}`);

      const linkElem19 = document.createElement('link');
      linkElem19.setAttribute('rel', 'stylesheet');
      linkElem19.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/ej2_dropdowns_material.css?dummy=${new Date()}`);

      const linkElem20 = document.createElement('link');
      linkElem20.setAttribute('rel', 'stylesheet');
      linkElem20.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/ej2_calendars_material.css?dummy=${new Date()}`);

      const linkElem21 = document.createElement('link');
      linkElem21.setAttribute('rel', 'stylesheet');
      linkElem21.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/ej2_buttons_material.css?dummy=${new Date()}`);

      const linkElem22 = document.createElement('link');
      linkElem22.setAttribute('rel', 'stylesheet');
      linkElem22.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/ej2_base_material.css?dummy=${new Date()}`);

      const linkElem23 = document.createElement('link');
      linkElem23.setAttribute('rel', 'stylesheet');
      linkElem23.setAttribute('href', `https://strelniceprerov.cz/wp-admin/css/smart.default.css?dummy=${new Date()}`);

      mountPoint.id = NAME;
      shadowRoot.appendChild(mountPoint);
      shadowRoot.appendChild(emotionRoot);
      shadowRoot.appendChild(linkElem);
      shadowRoot.appendChild(linkElem2);
      shadowRoot.appendChild(linkElem3);
      shadowRoot.appendChild(linkElem4);
      shadowRoot.appendChild(linkElem5);
      shadowRoot.appendChild(linkElem6);
      shadowRoot.appendChild(linkElem7);
      shadowRoot.appendChild(linkElem8);
      shadowRoot.appendChild(linkElem9);
      shadowRoot.appendChild(linkElem10);
      shadowRoot.appendChild(linkElem11);
      shadowRoot.appendChild(linkElem12);
      shadowRoot.appendChild(linkElem13);
      shadowRoot.appendChild(linkElem14);
      shadowRoot.appendChild(linkElem15);
      shadowRoot.appendChild(linkElem16);
      shadowRoot.appendChild(linkElem17);
      shadowRoot.appendChild(linkElem18);
      shadowRoot.appendChild(linkElem19);
      shadowRoot.appendChild(linkElem20);
      shadowRoot.appendChild(linkElem21);
      shadowRoot.appendChild(linkElem22);
      shadowRoot.appendChild(linkElem23);


      const addStylesheetRules = (style : any) => {
        const styleElement = document.createElement('style');
        styleElement.setAttribute('id', 'Animation_Style_ShadowDom');
        let styleSheet = null;

        shadowRoot.appendChild(styleElement);

        styleSheet = styleElement.sheet;

        styleSheet?.insertRule(style, styleSheet.cssRules.length);
        console.log(styleElement);
      }
      const keyframesStyle = `
      @-webkit-keyframes pulse {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
      }
    `;
      addStylesheetRules(keyframesStyle);

      const cache = createCache({
        key: 'css',
        prepend: true,
        container: emotionRoot,
      });

      if ((Component as any).propTypes) {
        this.props = Object.keys((Component as any).propTypes).reduce(
          (obj, item) => {
            return {
              ...obj,
              [`${item}`]: super.getAttribute(item),
            };
          },
          {}
        );
      }
      const root = createRoot(mountPoint); // createRoot(container!) if you use TypeScript

      root.render(
        <CacheProvider value={cache}>
          <CustomProviders>
            <Component {...this.props} />
          </CustomProviders>
        </CacheProvider>
      );
    }
  }

  if (!customElements.get(NAME)) {
    customElements.define(NAME, WebComponent as any);
  }
}
