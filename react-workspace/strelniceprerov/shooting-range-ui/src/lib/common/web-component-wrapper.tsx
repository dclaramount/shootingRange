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
      linkElem.setAttribute('href', 'https://strelniceprerov.cz/wp-admin/css/bw-bootstrap-strelnice.css');

      const linkElem2 = document.createElement('link');
      linkElem2.setAttribute('rel', 'stylesheet');
      linkElem2.setAttribute('href', 'https://strelniceprerov.cz/wp-admin/css/bw-calendar.css');

      const linkElem3 = document.createElement('link');
      linkElem3.setAttribute('rel', 'stylesheet');
      linkElem3.setAttribute('href', 'https://strelniceprerov.cz/wp-admin/css/bw-front-strelnice.css');

      const linkElem4 = document.createElement('link');
      linkElem4.setAttribute('rel', 'stylesheet');
      linkElem4.setAttribute('href', 'https://strelniceprerov.cz/wp-admin/css/bw-print-strelnice.css');

      const linkElem5 = document.createElement('link');
      linkElem5.setAttribute('rel', 'stylesheet');
      linkElem5.setAttribute('href', 'https://strelniceprerov.cz/wp-admin/css/bw-reboot-strelnice.css');

      const linkElem6 = document.createElement('link');
      linkElem6.setAttribute('rel', 'stylesheet');
      linkElem6.setAttribute('href', 'https://strelniceprerov.cz/wp-admin/css/bw-reservation-strelnice.css');

      const linkElem7 = document.createElement('link');
      linkElem7.setAttribute('rel', 'stylesheet');
      linkElem7.setAttribute('href', 'https://strelniceprerov.cz/wp-admin/css/bw-honest-week-picker.css');

      const linkElem8 = document.createElement('link');
      linkElem8.setAttribute('rel', 'stylesheet');
      linkElem8.setAttribute('href', "//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css");


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
